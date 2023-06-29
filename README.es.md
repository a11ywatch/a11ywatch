<div align="center">
  <h1>A11yWatch Lite</h1>
  <p>
    <strong>La herramienta de automatización de accesibilidad web rápida, precisa y sofisticada para mantenerse inclusivo</strong>
  </p>
  <p>

[![crates.io](https://img.shields.io/crates/v/a11ywatch_cli?label=latest)](https://docs.rs/crate/a11ywatch_cli/latest)
![MIT](https://img.shields.io/crates/l/a11ywatch_cli.svg)

  </p>
</div>

[![en](https://img.shields.io/badge/lang-en-white.svg)](README.md)
[![ja](https://img.shields.io/badge/lang-ja-red.svg)](README.ja.md)

A11yWatch Lite es una versión anterior y de código abierto de A11yWatch (una herramienta Vitals y de accesibilidad web alojada y de pago). ¡Fue la primera versión de nuestro software y se ha descargado mucho!

Si bien ya no agregamos funciones a esta versión Lite, continuaremos manteniéndola a largo plazo y corrigiendo cualquier error que surja.

## A11yWatch Lite vs A11yWatch

A11yWatch es mucho más detallado, rico en funciones y más rápido que A11yWatch Lite. [Inscribirse](https://a11ywatch.com/es) para A11yWatch gratis hoy. Ofrecemos integraciones API de alto rendimiento para cuentas pagas que salvarán su billetera en pliegues y mejorarán la madre naturaleza. La automatización de la accesibilidad web en las herramientas actuales fuera de A11yWatch puede ser muy dañina debido al costo de la latencia, algoritmos y protocolos inadecuados que desperdician toneladas de ciclos de energía/cpu, y mucho más debido al estado de los desafíos del trabajo sin la experiencia y dedicación requeridas. A11yWatch lidera las herramientas de automatización en velocidad y eficiencia, precisión y solidez cuando se trata de probar la accesibilidad con más cobertura que cualquier otra.

## Requisitos Previos

* [Rust](https://www.rust-lang.org/tools/install) se requiere si se construye localmente.
* [Nodejs](https://nodejs.org/en/download/) se requiere si se construye localmente.
* [Docker](https://docs.docker.com/get-docker/) es obligatorio si no está construyendo localmente.

## Instalando

[CLI](./cli/README.md) se puede utilizar para probar y crear su propia instancia en cualquier lugar.<br>
[Cliente](./clients) para API en múltiples idiomas y protocolos para integrarse con su aplicación más fácilmente.<br>
Ver el [documentación](https://docs.a11ywatch.com) para obtener más información sobre cómo comenzar con el desarrollo, etc.

## Empezando

Para comenzar con la plataforma de accesibilidad web más rápida y precisa, elija entre Cloud, CLI, Docker o Sidecar.

### A11yWatch Nube

[A11yWatch Nube](https://a11ywatch.com) es la forma más rápida de comenzar con A11yWatch. Proporciona infraestructura administrada, así como un acceso instantáneo y gratuito para proyectos y conceptos de desarrollo.
Para obtener una guía paso a paso sobre A11yWatch Nube, [ver los documentos](https://docs.a11ywatch.com/documentation/cloud/).

### A11yWatch CLI

[A11yWatch CLI](./cli/README.md) es una forma alternativa de comenzar con A11yWatch. Trae las herramientas para administrar la infraestructura, comandos poderosos para la interactividad y tiene la capacidad de automatizar flujos de trabajo usando herramientas como Github Actions y más.

Ejemplo de un rastreo de varias páginas con una instancia válida usando `a11ywatch_cli v0.8.23`:

https://user-images.githubusercontent.com/8095978/200062932-22fd962e-1e9a-4b56-9200-f19bdc5e6da8.mp4

Para un paso a paso [ver los documentos](https://docs.a11ywatch.com/documentation/cli/).

### Docker

También puede empezar a utilizar el [ser único docker imagen](https://hub.docker.com/r/a11ywatch/a11ywatch) localmente o autoalójelo.

Con una instalación de docker válida en una nueva carpeta, ejecute el siguiente comando (reemplace `latest` con `darwin` en macOS o use `IMAGE` env var):

```sh
# crear la red puente para front-end y back-end
docker network create --driver bridge a11ywatch-net
# iniciar el back-end
docker run -p 3280:3280 -v ${PWD}:/a11ywatch/conf \
  --network a11ywatch-net \
  --name a11ywatch-backend \
  -e SUPER_MODE=true \
  a11ywatch/a11ywatch:${IMAGE:-latest}
# iniciar la interfaz
docker run -p 3000:3000 -v ${PWD}:/a11ywatch/conf \
  --network a11ywatch-net \
  --name a11ywatch-frontend \
  -e SUPER_MODE=true \
  a11ywatch/web
```

Luego abierto http://localhost:3000 en su navegador para continuar.

Ejemplo del tablero que rastrea múltiples sitios web con actualizaciones en vivo:

https://user-images.githubusercontent.com/8095978/211600555-086516d9-403c-42bf-9f80-6e7da2354f40.mp4

Para obtener instrucciones paso a paso, [ver los documentos](https://docs.a11ywatch.com/documentation/self-hosting-start/).

### Sidecar

Si desea integrar su sistema con A11yWatch, la forma más sencilla es usar el javascript [sidecar](https://github.com/a11ywatch/sidecar).
El sidecar proporciona métodos de utilidad y lanza el sistema localmente para la integración con nodejs.

## Desarrollo

Ver el [documentos contribuyentes](https://docs.a11ywatch.com/documentation/contributing/) para empezar.

## [Puntos de referencia](./benchmarks)

Los puntos de referencia a continuación se realizan en una memoria Apple M1 Max de 64 gb.

### Local (no latencia)

Caso: `https://a11ywatch.com` exploración multisitio.
10x las ejecuciones simultáneas se ejecutaron a través de localhost para evitar la latencia.

|                                                            | `libraries`       |
| :--------------------------------------------------------- | :---------------- |
| **`Rust[A11yWatch]: crawl 10 times against 30 urls`**      | `10 ms`          |
| **`Nodejs[Pa11y-Wave]: crawl 10 times against 25 urls`**   | `63 s`            |
| **`Nodejs[Axe-Deque]: crawl 10 times against 25 urls`**    | `113 s`           |

### Afuera (latencia)

Puntos de referencia usando el [CLI](./cli/) y [hyperfine](https://github.com/sharkdp/hyperfine) con latencia de red.

Escaneo de una sola página:

```
hyperfine 'a11ywatch scan -u https://a11ywatch.com' 

Punto de referencia 1: a11ywatch scan -u https://a11ywatch.com
  Time (mean ± σ):     109.44 ms ±  10 ms    [User: 1.9 ms, System: 2.8 ms]
  Range (min … max):   98.35 ms … 154.3 ms    11 runs
```

Escaneo de varias páginas (30 páginas):

```
hyperfine 'a11ywatch crawl -u https://a11ywatch.com' 

Punto de referencia 1: a11ywatch crawl -u https://a11ywatch.com
  Time (mean ± σ):      0.6715 s ±  0.026 s    [User: 0.003 s, System: 0.003 s]
  Range (min … max):    0.6355 s …  0.714 s    10 runs
```

A11yWatch ayuda a generar confianza debido al manejo de los parámetros dinámicos y la cantidad de cobertura de los informes.

## [Ejemplos de integración](https://github.com/a11ywatch/a11ywatch-examples)

Algunos ejemplos de cómo integrarse con el sistema. Aprende a usar el [react-a11ywatch-js](https://github.com/a11ywatch/react-a11ywatch-js) ganchos y componentes lib para crear productos o herramientas personalizados.

## Apoyo

Si necesita apoyo, comience con el [guía para resolver problemas](https://docs.a11ywatch.com/documentation/troubleshooting),
si aún necesita ayuda, contáctenos [contacto](https://docs.a11ywatch.com/documentation/contact).

## LICENCIA

Compruebe el archivo de licencia en la raíz del proyecto.
