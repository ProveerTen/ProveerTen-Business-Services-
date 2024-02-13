"use strict";
//import connection from "../config/db-mysql";
/*
export const get_companies = (): Promise<any> => {

    const query = 'call get_companies';
    
    return new Promise((resolve, reject) => {
        connection.query(query, (error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result);
        });
    })
}

export const get_name_store_grocer = (document_grocer: string): Promise<string> => {

    const query = 'call get_store_grocer_by_id(?);';

    return new Promise((resolve, reject) => {
        connection.query(query, document_grocer, (error: any, result: any) => {
            if (error) {
                return reject(error)
            }
            resolve(result[0][0].name_store)
        });
    })
}



export const get_products = (nit_company: string): Promise<any> => {

    const query = 'call get_products_company (?);';

    return new Promise((resolve, reject) => {
        connection.query(query, nit_company ,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result)
        });
    })
}

export const get_providers = (nit_company: string): Promise<any> => {

    const query = 'call get_providers_company (?);';

    return new Promise((resolve, reject) => {
        connection.query(query, nit_company ,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result)
        });
    })
}


export const insert_order = (data: any): Promise<any> => {

    const query = 'call insertOrders (?,?,?,?,?,?,@message_text)';

    return new Promise((resolve, reject) => {
        connection.query(query,
            [
                data.id_order,
                data.order_delivery_date,
                data.total_ordered_price,
                data.status,
                data.document_provider,
                data.document_grocer
            ]
            , (error: any, result: any) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            });
    })
}


export const insert_products_order = async (id_order: string, products: any[]) => {
    
    const query = 'call insertOrdersProducts (?,?,?,@message_text)';
    const promises: Promise<any>[] = [];

    products.forEach((item: any) => {
        const promise = new Promise((resolve, reject) => {
            connection.query(query, [id_order, item.id_product, item.quantity], (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                    
                }
            });
        });
        promises.push(promise);
    });
    return Promise.all(promises);
};


export const get_stock = (id_product:string): Promise<any> => {

    const query = 'call get_stock(?)';
    
    return new Promise((resolve, reject) => {
        connection.query(query,id_product, (error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}

export const delete_order = async (id_order: string) => {
    
    const query = 'call delete_order (?,@message_text)';

        return new Promise ((resolve, reject) => {
            connection.query(query, id_order, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });

};

export const get_quantity_order = async (id_order: string) => {
    
    const query = 'call get_quantity_order (?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, id_order, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });

};

export const reset_quantity_order = async (id_product: string, quantity:number) => {
    
    const query = 'call reset_quantity_order (?,?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, [id_product,quantity], (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });

};

export const get_orders_grocer = async (document_grocer: string)  => {
    
    const query = 'call get_orders_grocer (?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, document_grocer, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
    });

};


export const get_orders_provider = async (document_provider: string)  => {
    
    const query = 'call get_orders_provider (?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, document_provider, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
    });

};


export const get_orders_company = async (nit_company: string)  => {
    
    const query = 'call get_orders_company (?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, nit_company, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
    });

};


export const get_order = async (id_order:string) => {
    
    const query = 'call get_order (?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, id_order, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
    });

};

export const get_orders_detail = async (id_order:string) => {
    
    const query = 'call get_orders_detail (?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, id_order, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
    });

};


export const delete_product_order = async (id_order: string) => {
    
    const query = 'call get_quantity_order (?)';

        return new Promise ((resolve, reject) => {
            connection.query(query, id_order, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });

};
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_product_order = exports.get_orders_detail = exports.get_order = exports.get_orders_company = exports.get_orders_provider = exports.get_orders_grocer = exports.reset_quantity_order = exports.get_quantity_order = exports.delete_order = exports.get_stock = exports.insert_products_order = exports.insert_order = exports.get_providers = exports.get_products = exports.get_name_store_grocer = exports.get_companies = void 0;
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const get_companies = () => {
    const query = 'select * from company';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            console.log("4");
            if (err) {
                console.log("5");
                console.log(err);
                reject(err);
            }
            connection.query(query, (error, result) => {
                console.log("6");
                connection.release();
                if (error) {
                    console.log("7");
                    console.log(error);
                    return reject('error');
                }
                console.log("8");
                resolve(result);
            });
        });
    });
};
exports.get_companies = get_companies;
const get_name_store_grocer = (document_grocer) => {
    const query = 'call get_store_grocer_by_id(?);';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, document_grocer, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result[0][0].name_store);
            });
        });
    });
};
exports.get_name_store_grocer = get_name_store_grocer;
const get_products = (nit_company) => {
    const query = 'call get_products_company (?);';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, nit_company, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result);
            });
        });
    });
};
exports.get_products = get_products;
const get_providers = (nit_company) => {
    const query = 'call get_providers_company (?);';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, nit_company, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result);
            });
        });
    });
};
exports.get_providers = get_providers;
const insert_order = (data) => {
    const query = 'call insertOrders (?,?,?,?,?,?,@message_text)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, [
                data.id_order,
                data.order_delivery_date,
                data.total_ordered_price,
                data.status,
                data.document_provider,
                data.document_grocer
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
exports.insert_order = insert_order;
const insert_products_order = (id_order, products) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call insertOrdersProducts (?,?,?,@message_text)';
    const promises = [];
    products.forEach((item) => {
        const promise = new Promise((resolve, reject) => {
            db_mysql_1.default.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                connection.query(query, [id_order, item.id_product, item.quantity], (error, result) => {
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
        promises.push(promise);
    });
    return Promise.all(promises);
});
exports.insert_products_order = insert_products_order;
const get_stock = (id_product) => {
    const query = 'call get_stock(?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result[0]);
            });
        });
    });
};
exports.get_stock = get_stock;
const delete_order = (id_order) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call delete_order (?,@message_text)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_order, (error, result) => {
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
exports.delete_order = delete_order;
const get_quantity_order = (id_order) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call get_quantity_order (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_order, (error, result) => {
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
exports.get_quantity_order = get_quantity_order;
const reset_quantity_order = (id_product, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call reset_quantity_order (?,?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, [id_product, quantity], (error, result) => {
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
exports.reset_quantity_order = reset_quantity_order;
const get_orders_grocer = (document_grocer) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call get_orders_grocer (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, document_grocer, (error, result) => {
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
});
exports.get_orders_grocer = get_orders_grocer;
const get_orders_provider = (document_provider) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call get_orders_provider (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, document_provider, (error, result) => {
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
});
exports.get_orders_provider = get_orders_provider;
const get_orders_company = (nit_company) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call get_orders_company (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, nit_company, (error, result) => {
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
});
exports.get_orders_company = get_orders_company;
const get_order = (id_order) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call get_order (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_order, (error, result) => {
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
});
exports.get_order = get_order;
const get_orders_detail = (id_order) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call get_orders_detail (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_order, (error, result) => {
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
});
exports.get_orders_detail = get_orders_detail;
const delete_product_order = (id_order) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call get_quantity_order (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_order, (error, result) => {
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
exports.delete_product_order = delete_product_order;
