const mysql = require('mysql');

//连接条件
const connection = mysql.createConnection({
    host: '192.168.1.5',
    user: 'root',
    password: '123456',
    database: 'node_DB',
    port: '3306'
});

/**
 * 查询全部
 * tableName--需要查询的表
 * fn--回掉查询的数据
 */
module.exports.selectAll = (tableName, fn) => {
    let callbackData = [];
    //创建mysql连接
    connection.connect();

    let conn = connection.query('select * from ??', [tableName], (err, results, fields) => {
        if (err) throw err;
        callbackData = results;
    });
    //关闭连接 
    connection.end();
    //在query查询数据的时候是异步操作，
    //还没得到数据js就已经执行完毕，等待异步返回结果，才能拿到数据，
    // 所有要返回数据只能在结束后执行一个回掉函数返回得到的数据。
    conn.on('end', () => {
        fn(callbackData);
    });
};

/**
 * 条件查询
 * pars--参数对象->
 *  tableNmae--表名
 *  attrID--条件类型
 *  parsObj--条件值
 * fn--回掉
 */
module.exports.selectWhere = (parsObj, fn) => {
    let callbackData = [];
    //创建mysql连接
    connection.connect();
    //??表示条件名，?条件值，可防止sql注入
    let conn = connection.query(
        'select * from ?? where ??=?', [parsObj.tableName, parsObj.attrID, parsObj.attrName],
        (err, results, fields) => {
            if (err) throw err;
            callbackData = results;
        });
    //关闭连接 
    connection.end();
    conn.on('end', () => {
        fn(callbackData);
    });
};

/**
 * 条件删除
 * tableNmae--表名
 * attrID--条件类型
 * attrName--条件值
 */
module.exports.deleteWhere = (parsObj, fn) => {
    let callbackData = [];
    console.log(parsObj.tableName, parsObj.attrID, parsObj.attrName);

    connection.connect();
    let conn = connection.query(
        'delete from ?? where ??=?', [parsObj.tableName, parsObj.attrID, parsObj.attrName],
        (err, results, fields) => {
            if (err) throw err;
            callbackData = results;
        });

    connection.end();

    conn.on('end', () => {
        fn(callbackData);
    });
};


/**
 * 自定义
 * sql--传入的sql语句
 * pars--sql语句的参数，数组
 * fn--执行后回掉数据
 */
module.exports.userDefined = (sql, parsArray, fn) => {
    let callbackData;
    connection.connect();
    let conn = connection.query(sql, parsArray, (err, results, fields) => {
        if (err) throw err;
        callbackData = results;
    });
    conn.on('end', () => {
        fn(callbackData);
    });
    connection.end();
};