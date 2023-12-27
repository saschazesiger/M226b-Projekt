package com.janis.plugins

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        staticResources("/", "static")
        apiRouting()
        userRouting(this@configureRouting)
    }
}
    
