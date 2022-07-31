export const getEnvVariables = () => {
    // NOTA: Se comenta y se exporta las variables de entorno de anera manual porque marca error al
    // generar el build de produccion

    // import.meta.env;

    // return {
    //     ...import.meta.env,
    // }

    return {
        VITE_API_URL: import.meta.env.VITE_API_URL,
    }
}