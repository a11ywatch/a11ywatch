/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { ApolloServer } from "apollo-server-express"
import { config, BYPASS_AUTH } from "./config"
import { getUser } from "./core/utils"
import { schema } from "./core/schema"
import { AUTH_ERROR } from "./core/strings"
import { SubDomainController } from "./core/controllers/subdomains"
import { ScriptsController } from "./core/controllers/scripts"
import { HistoryController } from "./core/controllers/history"
import { WebsitesController } from "./core/controllers/websites"
import { UsersController } from "./core/controllers/users"
import { IssuesController } from "./core/controllers/issues"
import { FeaturesController } from "./core/controllers/features"
import { AnalyticsController } from "./core/controllers/analytics"

const { DEV, SUBSCRIPTION_TIMOUT } = config

const serverConfig = {
  tracing: DEV,
  schema,
  subscriptions: {
    keepAlive: SUBSCRIPTION_TIMOUT || 10000
  },
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context
    }
    const authentication = req?.headers?.authorization
    const user = getUser(authentication)

    if (process.env.NODE_ENV !== "test") {
      if (!user && !BYPASS_AUTH.includes(req?.body?.operationName)) {
        if (DEV && !req?.body?.operationName) {
          console.info("graphql schema generating")
        } else {
          throw new Error(AUTH_ERROR)
        }
      }
    }

    return {
      user,
      models: {
        User: UsersController({ user }),
        Website: WebsitesController({ user }),
        Issue: IssuesController({ user }),
        Features: FeaturesController({ user }),
        SubDomain: SubDomainController({ user }),
        History: HistoryController({ user }),
        Analytics: AnalyticsController({ user }),
        Scripts: ScriptsController({ user })
      }
    }
  }
}

const Server = ApolloServer.bind(null, serverConfig)

export { Server, serverConfig }
