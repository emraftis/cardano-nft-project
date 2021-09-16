***
Video: Using Daedalus as a Cardano Node for Minting Tokens - CatalystFUND3 Episode1
Gen keys and address:

cardano-cli stake-address key-gen --verification-key-file stake.vkey --signing-key-file stake.skey
cardano-cli address key-gen --verification-key-file payment.vkey --signing-key-file payment.skey
cardano-cli address build --payment-verification-key-file payment.vkey --stake-verification-key-file stake.vkey --out-file payment.addr --testnet-magic $TESTNET_ID

send some ada

cardano-cli query utxo --address $(< payment.addr) --testnet-magic $TESTNET_ID --mary-era - Minting a native token mkdir policy cardano-cli address key-gen --verification-key-file policy/policy.vkey --signing-key-file policy/policy.skey touch policy/policy.script && echo "" > policy/policy.script

echo "{" >> policy/policy.script
echo " \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey)\"," >> policy/policy.script
echo " \"type\": \"sig\"" >> policy/policy.script
echo "}" >> policy/policy.script

cardano-cli transaction policyid --script-file ./policy/policy.script >> policy/policyId

cardano-cli query utxo --address $(< payment.addr) --testnet-magic $TESTNET_ID --mary-era

export TX_HASH=806ba02a2d643467c435b8554d4ece8110222268e3ef37701b9dc79e4e8d6d87
export TX_IX=0
export AVAILABLE_LOVELACE=50000000

cardano-cli transaction build-raw \
--mary-era \
--fee 0 \
--tx-in $TX_HASH#$TX_IX \
--tx-out $(< payment.addr)+$AVAILABLE_LOVELACE+"$TOKEN_AMOUNT $(< policy/policyId).$TOKEN_NAME" \
--mint="$TOKEN_AMOUNT $(< policy/policyId).$TOKEN_NAME" \
--out-file matx.raw

cardano-cli transaction calculate-min-fee \
--tx-body-file matx.raw \
--tx-in-count 1 \
--tx-out-count 1 \
--witness-count 1 \
--testnet-magic $TESTNET_ID \
--protocol-params-file protocol.json

export TX_FEE=

cardano-cli transaction build-raw \
--mary-era \
--fee $TX_FEE \
--tx-in $TX_HASH#$TX_IX \
--tx-out $(< payment.addr)+$(($AVAILABLE_LOVELACE - $TX_FEE))+"$TOKEN_AMOUNT $(< policy/policyId).$TOKEN_NAME" \
--mint="$TOKEN_AMOUNT $(< policy/policyId).$TOKEN_NAME" \
--out-file matx.raw

cardano-cli transaction sign \
--signing-key-file payment.skey \
--signing-key-file policy/policy.skey \
--script-file policy/policy.script \
--testnet-magic $TESTNET_ID \
--tx-body-file matx.raw \
--out-file matx.signed

cardano-cli transaction submit --tx-file matx.signed --testnet-magic $TESTNET_ID

cardano-cli query utxo --address $(< payment.addr) --testnet-magic $TESTNET_ID --mary-era export recipient=addr_test1qrkh980j5mkmtqgxx652u66hcpzshs5sk4y0x72jjcgmduulf32cmjct85j7yns9gked9tp5a7c5alyzv5cvatlmh2vqeh4ar9 export TX_HASH= export TX_IX=0 export AVAILABLE_LOVELACE= export TOKEN_AMOUNT=1024 export TX_FEE=0 echo $recipient > recipientpay.addr

cardano-cli transaction build-raw \
--mary-era \
--fee 0 \
--tx-in $TX_HASH#$TX_IX \
--tx-out "$(< recipientpay.addr)+$(($AVAILABLE_LOVELACE - $TX_FEE))+1024 $(< policy/policyId).$TOKEN_NAME" \
--out-file recipient_matx.raw

cardano-cli transaction calculate-min-fee \
--tx-body-file recipient_matx.raw \
--tx-in-count 1 \
--tx-out-count 1 \
--witness-count 1 \
--testnet-magic $TESTNET_ID \
--protocol-params-file protocol.json

export TX_FEE=

cardano-cli transaction build-raw \
--mary-era \
--fee $TX_FEE \
--tx-in $TX_HASH#$TX_IX \
--tx-out "$(< recipientpay.addr)+$(($AVAILABLE_LOVELACE - $TX_FEE))+1024 $(< policy/policyId).$TOKEN_NAME" \
--out-file recipient_matx.raw

cardano-cli transaction sign \
--signing-key-file payment.skey \
--signing-key-file policy/policy.skey \
--testnet-magic $TESTNET_ID \
--tx-body-file recipient_matx.raw \
--out-file recipient_matx.signed

cardano-cli transaction submit --tx-file recipient_matx.signed --testnet-magic $TESTNET_ID


***
VIDEO: How to setup Daedalus as a Cardano Node in 5 mins on Windows 10 - CatalystFUND3 Episode2
Set Environment Variables:

(ADD)
Path: Where Daedalus is installed
C:\Program Files\Daedalus Mainnet

(NEW)
CARDANO_NODE_SOCKET_PATH: Once Daedalus is running you can find this
\\.\pipe\cardano-node-mainnet.8568.0

Search Bar "CMD" in Commandline copy&paste:

wmic process get name, commandline > procs.txt

notepad procs.txt

In Notepad, Find

 "socket-path"

Search Bar and restart "CMD" in Commandline copy&paste:

cardano-cli query tip â€“mainnet

 
***
More Cardano-cli: https://docs.cardano.org/projects/cardano-node/en/latest/reference/cardano-node-cli-reference.html