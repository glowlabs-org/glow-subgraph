-include .env

deploy :; cp subgraph.mainnet.yaml subgraph.yaml && graph deploy --node ${DEPLOY_METADATA} \
	&& rm subgraph.yaml

deploy.sepolia :; cp subgraph.sepolia.yaml subgraph.yaml && graph deploy --node ${DEPLOY_METADATA_SEPOLIA} \
	&& rm subgraph.yaml
