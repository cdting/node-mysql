const conn = require('../mysql/mysql_connection');


//测试删除 OK
// conn.deleteWhere({
//     tableName: 'node_user',
//     attrID: 'name',
//     attrName: '哈哈'
// }, (data) => {
//     console.log(data);
// });

//模糊查询
conn.vagueQuery({
    tableName: 'node_user',
    attrID: 'name',
    attrName: 'tin'
}, (data) => {
    console.log(data);
})