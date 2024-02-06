import bcrypt from 'bcrypt';
import { QueryError } from 'mysql2'
//import connection from '../config/db-mysql';

let getQuery: string, updatePassQuery: string, passwordRolDB: string;

/*

export const changePasswordCompany_ = (dataToken: any, newData: any, callback: any) => {

    const { role, email, id } = dataToken;

    let { oldPassword, newPassword } = newData

    getQuery = `select password_company from company WHERE nit_company = ?`
    updatePassQuery = `UPDATE company set password_company = ? WHERE nit_company = ?`
    passwordRolDB = "password_company"

    try {
        connection.query(getQuery, [id], async (err: QueryError | null, result: any[]) => {
            if (err) {
                callback({ "Error de base de datos": err })
            }

            if (result.length > 0) {
                let passwordDB = result[0][passwordRolDB];

                const isMatch = await bcrypt.compare(oldPassword, passwordDB);

                if (isMatch) {
                    newPassword = await bcrypt.hash(newPassword, 10);
                    connection.query(updatePassQuery, [newPassword, id], (err: QueryError | null, result: any[]) => {
                        if (err) {
                            callback({ "Error de base de datos": err })
                        } else {
                            callback(null, "Contraseña Actualizada")
                        }
                    });
                } else {
                    callback("la contraseña antigua no coincide")
                }
            } else {
                callback("Usuario no encontrado")
            }
        });

    } catch (error) {
        callback({ "Error en la función changePassword company": error })
    }
}

export const changePasswordProvider_ = (dataToken: any, newData: any, callback: any) => {

    const { role, email, id } = dataToken;

    let { oldPassword, newPassword } = newData

    getQuery = `select password_provider from provider WHERE document_provider = ?`
    updatePassQuery = `UPDATE provider set password_provider = ? WHERE document_provider = ?`
    passwordRolDB = "password_provider"

    try {
        connection.query(getQuery, [id], async (err: QueryError | null, result: any[]) => {
            if (err) {
                callback({ "Error de base de datos": err })
            }

            if (result.length > 0) {
                let passwordDB = result[0][passwordRolDB];

                const isMatch = await bcrypt.compare(oldPassword, passwordDB);

                if (isMatch) {
                    newPassword = await bcrypt.hash(newPassword, 10);
                    connection.query(updatePassQuery, [newPassword, id], (err: QueryError | null, result: any[]) => {
                        if (err) {
                            callback({ "Error de base de datos": err })
                        } else {
                            callback(null, "Contraseña Actualizada")
                        }
                    });
                } else {
                    callback("la contraseña antigua no coincide")
                }
            } else {
                callback("Usuario no encontrado")
            }
        });

    } catch (error) {
        callback({ "Error en la función changePassword provider": error })
    }
}

export const changePasswordGrocer_ = (dataToken: any, newData: any, callback: any) => {

    const { role, email, id } = dataToken;

    let { oldPassword, newPassword } = newData

    getQuery = `select password_grocer from grocer WHERE document_grocer = ?`
    updatePassQuery = `UPDATE grocer set password_grocer = ? WHERE document_grocer = ?`
    passwordRolDB = "password_grocer"

    try {
        connection.query(getQuery, [id], async (err: QueryError | null, result: any[]) => {
            if (err) {
                callback({ "Error de base de datos": err })
            }

            if (result.length > 0) {
                let passwordDB = result[0][passwordRolDB];

                const isMatch = await bcrypt.compare(oldPassword, passwordDB);

                if (isMatch) {
                    newPassword = await bcrypt.hash(newPassword, 10);
                    connection.query(updatePassQuery, [newPassword, id], (err: QueryError | null, result: any[]) => {
                        if (err) {
                            callback({ "Error de base de datos": err })
                        } else {
                            callback(null, "Contraseña Actualizada")
                        }
                    });
                } else {
                    callback("la contraseña antigua no coincide")
                }
            } else {
                callback("Usuario no encontrado")
            }
        });

    } catch (error) {
        callback({ "Error en la función changePassword grocer": error })
    }
}

*/
import pool from '../config/db-mysql';


export const changePasswordCompany_ = (dataToken: any, newData: any, callback: any) => {

    const { role, email, id } = dataToken;

    let { oldPassword, newPassword } = newData

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }

        getQuery = `select password_company from company WHERE nit_company = ?`
        updatePassQuery = `UPDATE company set password_company = ? WHERE nit_company = ?`
        passwordRolDB = "password_company"

        try {
            connection.query(getQuery, [id], async (err: QueryError | null, result: any[]) => {
                connection.release();
                if (err) {
                    callback({ "Error de base de datos": err })
                }

                if (result.length > 0) {
                    let passwordDB = result[0][passwordRolDB];

                    const isMatch = await bcrypt.compare(oldPassword, passwordDB);

                    if (isMatch) {
                        newPassword = await bcrypt.hash(newPassword, 10);
                        connection.query(updatePassQuery, [newPassword, id], (err: QueryError | null, result: any[]) => {
                            connection.release();
                            if (err) {
                                callback({ "Error de base de datos": err })
                            } else {
                                callback(null, "Contraseña Actualizada")
                            }
                        });
                    } else {
                        callback("la contraseña antigua no coincide")
                    }
                } else {
                    callback("Usuario no encontrado")
                }
            });

        } catch (error) {
            callback({ "Error en la función changePassword company": error })
        }
    });
}

export const changePassProvider = async (dataToken: any, newData: any, callback: any) => {

    const { role, email, id } = dataToken;

    let { password_provider } = newData;

    console.log(newData);


    password_provider = await bcrypt.hash(password_provider, 10);

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }

        updatePassQuery = "UPDATE provider set password_provider = ? WHERE document_provider = ?";
        passwordRolDB = "password_provider"
        try {

            connection.query(updatePassQuery, [password_provider, id], (err: QueryError | null, result: any[]) => {
                connection.release();
                if (err) {
                    callback({ "Error de base de datos": err })
                } else {
                    callback(null, "Contraseña Actualizada")
                }
            });

        } catch (error) {
            callback({ "Error en la función changePassword provider": error })
        }
    });
}

export const changePasswordProvider_ = (dataToken: any, newData: any, callback: any) => {

    const { role, email, id } = dataToken;

    let { oldPassword, newPassword } = newData

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }

        getQuery = `select password_provider from provider WHERE document_provider = ?`
        updatePassQuery = `UPDATE provider set password_provider = ? WHERE document_provider = ?`
        passwordRolDB = "password_provider"

        try {
            connection.query(getQuery, [id], async (err: QueryError | null, result: any[]) => {
                connection.release();
                if (err) {
                    callback({ "Error de base de datos": err })
                }

                if (result.length > 0) {
                    let passwordDB = result[0][passwordRolDB];

                    const isMatch = await bcrypt.compare(oldPassword, passwordDB);

                    if (isMatch) {
                        newPassword = await bcrypt.hash(newPassword, 10);
                        connection.query(updatePassQuery, [newPassword, id], (err: QueryError | null, result: any[]) => {
                            connection.release();
                            if (err) {
                                callback({ "Error de base de datos": err })
                            } else {
                                callback(null, "Contraseña Actualizada")
                            }
                        });
                    } else {
                        callback("la contraseña antigua no coincide")
                    }
                } else {
                    callback("Usuario no encontrado")
                }
            });

        } catch (error) {
            callback({ "Error en la función changePassword provider": error })
        }
    });
}


export const changePasswordGrocer_ = (dataToken: any, newData: any, callback: any) => {

    const { role, email, id } = dataToken;

    let { oldPassword, newPassword } = newData

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }

        getQuery = `select password_grocer from grocer WHERE document_grocer = ?`
        updatePassQuery = `UPDATE grocer set password_grocer = ? WHERE document_grocer = ?`
        passwordRolDB = "password_grocer"

        try {
            connection.query(getQuery, [id], async (err: QueryError | null, result: any[]) => {
                connection.release();
                if (err) {
                    callback({ "Error de base de datos": err })
                }

                if (result.length > 0) {
                    let passwordDB = result[0][passwordRolDB];

                    const isMatch = await bcrypt.compare(oldPassword, passwordDB);

                    if (isMatch) {
                        newPassword = await bcrypt.hash(newPassword, 10);
                        connection.query(updatePassQuery, [newPassword, id], (err: QueryError | null, result: any[]) => {
                            connection.release();
                            if (err) {
                                callback({ "Error de base de datos": err })
                            } else {
                                callback(null, "Contraseña Actualizada")
                            }
                        });
                    } else {
                        callback("la contraseña antigua no coincide")
                    }
                } else {
                    callback("Usuario no encontrado")
                }
            });

        } catch (error) {
            callback({ "Error en la función changePassword grocer": error })
        }
    });
}