import pool from "../config/db-mysql";
import { format } from 'date-fns';
import generateRandomString from "../helpers/generate-string";

export const get_name_company = (nit_company: string): Promise<string> => {
  const query = "call  get_name_company_by_id(?)";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, nit_company, (error: any, result: any) => {
        connection.release();
        if (error) {
          return reject(error);
        }
        resolve(result[0][0].name_company);
      });
    });
  })
};

export const insert_product = (data: any): Promise<any> => {
  console.log("PRODUCT l ", data);

  const query = "call insertProduct(?,?,?,?,?,?,?,?,?,?,'Disponible',?,?,@message_text)";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(
        query,
        [
          data.id_product,
          data.name_product,
          data.description_product,
          data.purchase_price_product,
          data.unit_purchase_price_product,
          data.suggested_unit_selling_price_product,
          data.purchase_quantity,
          data.stock_product,
          data.content_product,
          data.image_product,
          // data.availability_product,
          data.date_creation,
          data.fk_product_nit_company,
        ],
        (error: any, result: any) => {
          connection.release()
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

/*
export const insert_product_category = (id_product: string, categories: string[]) => {
  const query = "call insert_product_category(?, ?, @message_text)";

  categories.forEach((category) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          reject(err)
        }
        connection.query(query, [id_product, category], (error: any, result: any) => {
          connection.release();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    });
  });
};
*/

export const insert_product_category = (id_product: string, category: string) => {
  const query = "call insert_product_category(?,?,@message_text)";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, [id_product, category], (error: any, result: any) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });
};

export const insert_product_subCategory = (id_product: string, subCategory: string) => {
  const query = "call insert_product_subCategory(?,?,@message_text)";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, [id_product, subCategory], (error: any, result: any) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });
};


// delete
export const delete_product = (id_product: string) => {
  const query = "call delete_product(?, @message_text)";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }

      connection.query(query, id_product, (error: any, result: any) => {
        connection.release();
        if (error) {
          console.log(error);

          reject(error);
        } else {

          resolve(result);
        }
      });
    });
  });
};

export const deleteOldImage = (urlImage: string, urlVaues: any, fieldName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(urlImage, urlVaues, (err, result: any[]) => {
        connection.release();
        if (err) {
          reject({ "Error al consultar en la bd:": err });
        } else {
          let urlImagen: string | null = result[0][fieldName];
          console.log("urlImagen", urlImagen);

          if (urlImagen != null) {
            let split = urlImagen.split(/[./]/);
            console.log("Split", split);
            resolve(split[9]);
          } else {
            resolve(null);
          }
        }
      });
    });
  });
};

export const delete_product_category = (id_product: string) => {
  const query = "call delete_product_category(?, @message_text)";
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, id_product, (error: any, result: any) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  });
};

export const delete_product_suggested = (id_product: string) => {
  const query = "delete from suggested_product_price where fk_id_product_suggested_price = ?";
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, id_product, (error: any, result: any) => {
        connection.release();
        if (error) {
          console.log(error);

          reject(error);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  });
};

export const verifyExistProduct = (idP: string): Promise<any> => {
  const queryV = "SELECT * FROM product WHERE id_product = ?";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(queryV, idP, (error: any, results: any) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
};

export const updateDataProduct = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      const query =
        "call UpdateProduct (?,?,?,?,?,?,?,?,?,?,?,?, @message_text);";
      connection.query(
        query,
        [
          data.id_product,
          data.name_product,
          data.description_product,
          data.purchase_price_product,
          data.unit_purchase_price_product,
          data.suggested_unit_selling_price_product,
          data.purchase_quantity,
          data.stock_product,
          data.content_product,
          data.image_product,
          data.availability_product,
          data.fk_product_nit_company,
        ],
        (error: any, results: any) => {
          connection.release();
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  });
};


export const insert_suggest_product_price = (id_product: string, document_grocer: string, price_product: number) => {

  const query = "call suggest_product_price(?,?,?,@message_text)";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, [id_product, document_grocer, price_product], (error: any, result: any) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(result[0]);
        }
      });
    });
  });
};

export const get_product_price = (id_product: string) => {

  const query = "select suggested_unit_selling_price_product from product where id_product = (?) ;";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, id_product, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0]);
        }
      });
    });
  });
};

export const get_product = (id_product: string): Promise<string> => {
  const query = "call get_product(?)";

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      connection.query(query, id_product, (error: any, result: any) => {
        connection.release();
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  })
};

export const insert_products = async (nit_company: string, products: any[]) => {

  const query = "call insertProduct(?,?,?,?,?,?,?,?,?,?,'Disponible',?,?,@message_text)";
  const promises: Promise<any>[] = [];

  products.forEach((data: any) => {
    let id_product = data.name_product.replace(/\s/g, '_') + '_' + generateRandomString(5);
    const promise = new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          reject(err)
        }
        connection.query(query, [
          id_product,
          data.name_product,
          data.description_product,
          data.purchase_price_product,
          data.unit_purchase_price_product,
          data.suggested_unit_selling_price_product,
          data.purchase_quantity,
          data.stock_product,
          data.content_product,
          data.image_product,
          format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
          nit_company
        ], (error: any, result: any) => {
          connection.release();
          if (error) {
            reject(error);
          } else {
            resolve(result);

          }
        });
      });
    });
    promises.push(promise);
  });
  return Promise.all(promises);
};