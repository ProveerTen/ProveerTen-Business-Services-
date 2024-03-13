import pool from "../config/db-mysql";

export const verifyProvider = (document: any, callback: any) => {
  const providerSql = "call VerifyProvider(?,@message_text);";
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    try {
      connection.query(providerSql, document, (error: any, results: any) => {
        connection.release();
        if (error) {
          return callback(error);
        }

        callback(null, results);
      });
    } catch (error) {
      return callback(error);
    }
  })
};


export const providerDelete = (document_provider: any, callback: any) => {


  const deleteQuery = "call delete_provider (?,@message_text);";
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    try {
      connection.query(
        deleteQuery,
        document_provider,
        (error: any, results: any) => {
          connection.release();
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    } catch (error) {
      return callback(error);
    }
  })
};
