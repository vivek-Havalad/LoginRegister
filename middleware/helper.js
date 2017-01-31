var self={
	queryRunner:function(data,callback){
		/*
			Function required to run all the queries.
		*/
		var db_conncetion=data.connection;
		console.log("dataconn");
		var query=data.query;
		var insert_data=data.insert_data;
		db_conncetion.getConnection(function(err,con){
			if(err){
					console.log("dataconn");
			  con.release();
			}else{
				db_conncetion.query(String(query),insert_data,function(err,rows){
			    con.release();
			    if(!err) {
			    	callback(rows);
			    } else {
			      console.log(err);
			      console.log("Query failed");
			    }
			  });
			}
		});
	},
	getUserInfo:function(uid,connection,callback){
		/*
			Function to get user information.
		*/
		var data={
			query:"select id,name,p_photo,online from user where id='"+uid+"'",
			connection:connection
		}
		self.queryRunner(data,function(result){
			if(result.length>0) {
				var user_info="";
				result.forEach(function(element, index, array){
					user_info={
						name:element.name,
						p_photo:element.p_photo,
						online:element.online
					};
				});
		    	result_send={
		    		data:user_info,
		    		msg:"OK"
		    	};
		    } else {
		    	result_send={
		    		data:null,
		    		msg:"BAD"
		    	};
		    }
		    callback(result_send);
		});
	},


	mergeUsers:function(socketUsers,dbUsers,newUsers,callback){
		/*
			Function Merge online and offline users.
		*/
		var tempUsers = [];
		for(var i in socketUsers){
			var shouldAdd = false;
			for (var j in dbUsers){
				if(newUsers=='yes'){
					if (dbUsers[j].id == socketUsers[i].id) {
						shouldAdd = false;
						dbUsers.splice(j,1); //Removing single user
						break;
					}
				}else{
					if (dbUsers[j].id == socketUsers[i].id) {
						dbUsers[j].socketId = socketUsers[i].socketId;
						shouldAdd = true;
						break;
			       }
				}
			}
			if(!shouldAdd){
				tempUsers.push(socketUsers[i]);
			}
		}
		if(newUsers=='no'){
			tempUsers = tempUsers.concat(dbUsers);
		}else{
			tempUsers = dbUsers;
		}
		callback(tempUsers);
	}
}
module.exports = self;
