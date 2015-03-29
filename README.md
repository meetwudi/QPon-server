# QPon Server Application

Server side application for [QPon](https://github.com/tjwudi/QPon).

### Fetchers And Transformers

**Fetchers** are used to fetch data from various web services. Each fetcher will fetch raw data from exactly one web service.

**Transformers** are used to transform raw data into QPon-compatible schema. Each transformer will transform data from exactly one web service.

Both raw data and QPon-compatible schema will be persisted into data store.

### Scheduler

Fetchers and transformers are run by **scheduler**. Scheduler will try to run a transformer or fetcher in every given period.

### Data store

Data are stored in [MongoDB](https://www.mongodb.org/). 

### SPDY Enabled

SPDY protocal (predecessor of HTTP/2) is chosed as the default HTTP protocal.

### Data schema

See [QPon Data Schema](https://github.com/tjwudi/QPon/docs/data-schema.md).

### API

See [Server API Specification](https://github.com/tjwudi/QPon/docs/api.md).