const conn = require('../mysql/mysql_connection');


//测试删除 OK
conn.deleteWhere({
    tableName: 'node_user',
    attrID: 'name',
    attrName: 'tin'
}, (data) => {
    console.log(data);
});