use actix_web::{web, App, HttpServer, Responder};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use std::sync::atomic::{AtomicU32, Ordering};

#[derive(Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
}

static COUNT: AtomicU32 = AtomicU32::new(0);

async fn get_users() -> impl Responder {
    let users = vec![
        User { id: 1, name: "Alice".to_string() },
        User { id: 2, name: "Bob".to_string() },
    ];
    let current_count = COUNT.fetch_add(1, Ordering::SeqCst);
    println!("hello! A request was generated: {}", current_count);
    web::Json(users)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .route("/api/users", web::get().to(get_users))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
