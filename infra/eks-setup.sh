#!/bin/bash
# Merinova AI - EKS Cluster Setup Script (AWS)

set -e

CLUSTER_NAME="merinova-research-cluster"
REGION="us-east-1"

echo "🚀 Bootstrapping Merinova Scientific Cluster on AWS..."

eksctl create cluster \
  --name $CLUSTER_NAME \
  --version 1.27 \
  --region $REGION \
  --nodegroup-name standard-nodes \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 10 \
  --managed

echo "✅ Cluster $CLUSTER_NAME ready."
