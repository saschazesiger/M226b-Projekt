package com.janis.plugins

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.sql.*

fun Route.userRouting(app: Application) {
    route("/user") {
        get {
            val connection = app.connectToSql(embedded = false)
            val statement = connection.createStatement()
            val resultSet = statement.executeQuery("SELECT * FROM absence;")
        
            while (resultSet.next()) {
                println("User: ${resultSet.getString("name")}")
            }
        
            connection.close()
            call.respondText("ok")
        }
        post {
            // Hier können Sie Ihre Logik für POST-Anfragen hinzufügen
        }
        route("/login") {
            get {

                
            }
        }
    }
}
        