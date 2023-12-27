package com.janis.plugins

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.apiRouting() {
    route("/api") {
        get {
            call.respondText("ok")
        }
        post {
            // Hier können Sie Ihre Logik für POST-Anfragen hinzufügen
        }
        
        // Fügen Sie weitere HTTP-Methoden nach Bedarf hinzu
    }
}