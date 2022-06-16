use criterion::{criterion_group, black_box, criterion_main, Criterion};
use std::process::{Command};
use std::time::Duration;

/// bench multi-site crawling between different libraries
pub fn bench_speed(c: &mut Criterion) {
    let mut group = c.benchmark_group("crawl-speed/libraries");
    let url = "http://host.docker.internal:3270";

    group.sample_size(10).measurement_time(Duration::new(180, 0) + Duration::from_millis(500));
    group.bench_function("Rust[a11ywatch]: with crawl 10 times", |b| b.iter(||black_box(Command::new("a11ywatch")
        .args(["crawl", "-u", url])
        .output()
        .expect("rust command failed to start"))
    ));
    group.finish();
}

criterion_group!(benches, bench_speed);
criterion_main!(benches);
