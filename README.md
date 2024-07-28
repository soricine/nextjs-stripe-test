# Accept a Payment

Build a simple checkout form to collect payment details. Included are some basic
build and run scripts you can use to start up the application.

## Configuration 

You must copy the `.env.example` to `.env`

```console
cp .env.example .env
```

Then you must set this three variables to match the settingas

* `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
* `STRIPE_SECRET_KEY`
* `DATABASE_URL`

The first two variables can be found in the dev portal of [stripe.com](https://stripe.com)

The `DATABASE_URL` should be a local file path to sqlite3 database, for exapmle: 

```
DATABASE_URL="file:./dev.db"
```

## Running the sample

### Development
1. Build the application
~~~shell
$ npm install
~~~

2. _Optional_: download and run the [Stripe CLI](https://stripe.com/docs/stripe-cli)
~~~shell
$ stripe listen --forward-to localhost:3000/api/webhooks
~~~

3. Run the application
~~~shell
$ STRIPE_WEBHOOK_SECRET=$(stripe listen --print-secret) npm run dev
~~~

4. Go to [localhost:3000](http://localhost:3000)

### Production
1. Build the application
~~~shell
$ npm install

$ npm build
~~~

2. Run the application
~~~shell
$ npm start
~~~