"use strict";
//import connection from "../config/db-mysql";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_product_price = exports.insert_suggest_product_price = exports.updateDataProduct = exports.verifyExistProduct = exports.delete_product_category = exports.deleteOldImage = exports.delete_product = exports.insert_product_category = exports.insert_product = exports.get_name_company = void 0;
/*
export const get_name_company = (nit_company: string): Promise<string> => {
  const query = "call  get_name_company_by_id(?)";

  return new Promise((resolve, reject) => {
    connection.query(query, nit_company, (error: any, result: any) => {
      if (error) {
        return reject(error);
      }
      resolve(result[0][0].name_company);
    });
  });
};

export const insert_product = (data: any): Promise<any> => {
  const query = "call insertProduct(?,?,?,?,?,?,?,?,?,?,?,?,@message_text)";

  return new Promise((resolve, reject) => {
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
      (error: any, result: any) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
};



// export const insert_product_category = (id_product: string, categories: string[]): Promise<string[]> => {
//     const query = 'call  insert_product_category(?, ?, @message_text)';
//     const promises: Promise<string>[] = [];

//     categories.forEach(category => {
//         const promise = new Promise<string>((resolve, reject) => {
//             connection.query(query, [id_product, category], (error: any, result: any) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             });
//         });
//         promises.push(promise);
//     });

//     return Promise.all(promises);
// };

export const insert_product_category = (
  id_product: string,
  categories: string[]
) => {
  const query = "call  insert_product_category(?, ?, @message_text)";

  categories.forEach((category) => {
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [id_product, category],
        (error: any, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  });
};

// delete
export const delete_product = (id_product: string) => {
  const query = "call delete_product(?, @message_text)";

  return new Promise((resolve, reject) => {
    connection.query(query, id_product, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const deleteOldImage = (
  urlImage: string,
  urlVaues: any,
  fieldName: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    connection.query(urlImage, urlVaues, (err, result: any[]) => {
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
};

export const delete_product_category = (id_product: string) => {
  const query = "call delete_product_category(?, @message_text)";

  return new Promise((resolve, reject) => {
    connection.query(query, id_product, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const verifyExistProduct = (idP: string): Promise<any> => {
  const queryV = "SELECT * FROM product WHERE id_product = ?";

  return new Promise((resolve, reject) => {
    connection.query(queryV, idP, (error: any, results: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateDataProduct = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
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
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};


export const insert_suggest_product_price = (id_product:string,document_grocer:string,price_product:number) => {

  const query = "call suggest_product_price(?,?,?,@message_text)";

  return new Promise((resolve, reject) => {
    connection.query(query, [id_product,document_grocer,price_product], (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result[0]);
      }
    });
  });
};

export const get_product_price = (id_product:string) => {

  const query = "select suggested_unit_selling_price_product from product where id_product = (?) ;";

  return new Promise((resolve, reject) => {
    connection.query(query,id_product, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result[0]);
      }
    });
  });
};

*/
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const get_name_company = (nit_company) => {
    const query = "call  get_name_company_by_id(?)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, nit_company, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result[0][0].name_company);
            });
        });
    });
};
exports.get_name_company = get_name_company;
const insert_product = (data) => {
    const query = "call insertProduct(?,?,?,?,?,?,?,?,?,?,?,?,@message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, [
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
            ], (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};
exports.insert_product = insert_product;
const insert_product_category = (id_product, categories) => {
    const query = "call insert_product_category(?, ?, @message_text)";
    categories.forEach((category) => {
        return new Promise((resolve, reject) => {
            db_mysql_1.default.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                connection.query(query, [id_product, category], (error, result) => {
                    connection.release();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    });
};
exports.insert_product_category = insert_product_category;
// delete
const delete_product = (id_product) => {
    const query = "call delete_product(?, @message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    });
};
exports.delete_product = delete_product;
const deleteOldImage = (urlImage, urlVaues, fieldName) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(urlImage, urlVaues, (err, result) => {
                connection.release();
                if (err) {
                    reject({ "Error al consultar en la bd:": err });
                }
                else {
                    let urlImagen = result[0][fieldName];
                    console.log("urlImagen", urlImagen);
                    if (urlImagen != null) {
                        let split = urlImagen.split(/[./]/);
                        console.log("Split", split);
                        resolve(split[9]);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    });
};
exports.deleteOldImage = deleteOldImage;
const delete_product_category = (id_product) => {
    const query = "call delete_product_category(?, @message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    });
};
exports.delete_product_category = delete_product_category;
const verifyExistProduct = (idP) => {
    const queryV = "SELECT * FROM product WHERE id_product = ?";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(queryV, idP, (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    });
};
exports.verifyExistProduct = verifyExistProduct;
const updateDataProduct = (data) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            const query = "call UpdateProduct (?,?,?,?,?,?,?,?,?,?,?,?, @message_text);";
            connection.query(query, [
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
            ], (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    });
};
exports.updateDataProduct = updateDataProduct;
const insert_suggest_product_price = (id_product, document_grocer, price_product) => {
    const query = "call suggest_product_price(?,?,?,@message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, [id_product, document_grocer, price_product], (error, result) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    });
};
exports.insert_suggest_product_price = insert_suggest_product_price;
const get_product_price = (id_product) => {
    const query = "select suggested_unit_selling_price_product from product where id_product = (?) ;";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    });
};
exports.get_product_price = get_product_price;
