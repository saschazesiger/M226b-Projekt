package com.janis.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.sql.*
import kotlinx.coroutines.*


fun Application.connectToSql(embedded: Boolean): Connection {
    Class.forName("org.sql.Driver")
    if (embedded) {
        return DriverManager.getConnection("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "root", "")
    } else {
        val url = "jdbc:sql://aws.connect.psdb.cloud:3306/time"
        val user = "trvm1fmwhutcuudghtue"
        val password = "pscale_pw_Lxn7APZv7uMeJeO9bBWn9JQWZ9JaqlAVSQ91NxOOJh3"

        return DriverManager.getConnection(url, user, password)
    }
}


