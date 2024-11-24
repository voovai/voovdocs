---
title: Importing Models
description: How to Import Models to Catalyst.
sidebar:
  order: 101  # Lower numbers appear first
---

This guide will show how to import models from OpenAI API compatible providers and also from your local Ollama

Catalyst comes with a default model called VooV that allows to perform basic tasks. You could also add your own local models either in your local machine or on a local network. 

Many AI models support OpenAI API compatibility. This is what allows Catalyst to communicate with them.

## Models Page

To get to Models page, navigate to 

https://catalyst.voov.ai/models

or click on the models icon on the menu

![alt text](https://static.objectgraph.com/img/catalyst-nav.png)

Initially you will see only one model

![alt text](https://static.objectgraph.com/img/catalyst-models.png)

If you already have Ollama running locally, you can click on Import Ollama

![alt text](https://static.objectgraph.com/img/catalyst-import-ollama.png)

Click on Import Models.

Catalyst will make a connection to your localhost on port 11434 to import models.

If Ollama is not running or it does not allow CORS, this will fail.

Please follow the [guide](/guides/ollama-cors-hostbinding) on how to allow ollama CORS 