package com.realnet.suredata.Services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.stereotype.Service;

//import com.mongodb.ConnectionString;
//import com.mongodb.MongoClientSettings;
//import com.mongodb.client.MongoClient;
//import com.mongodb.client.MongoClients;

@Service
public class DatabaseConnectionServices {
	
	

	public Connection Connection(String database_type, String username, String password, String db_url)
			throws SQLException {
		
		

		if (database_type.equalsIgnoreCase("mysql")) {
			Connection connection = mysqlconnection(username, password, db_url);
			return connection;

		} else if (database_type.equalsIgnoreCase("postgresql")) {
			Connection connection = postgreconnection(username, password, db_url);
			return connection;

		} else if (database_type.equalsIgnoreCase("mysql_lite")) {
			Connection connection = mysql_liteconnection(username, password, db_url);
			return connection;

		} else if (database_type.equalsIgnoreCase("ms_sql")) {
			Connection connection = ms_sqlconnection(username, password, db_url);
			return connection;

		} else if (database_type.equalsIgnoreCase("oracle")) {
			Connection connection = oracleconnection(username, password, db_url);
			return connection;

		} else if (database_type.equalsIgnoreCase("maria_db")) {
			Connection connection = maria_dbconnection(username, password, db_url);
			return connection;

		}
		
//		if (database_type.equalsIgnoreCase("mongodb")) {
//	        return mongoConnection(db_url);
//		}
		
		else {
			return null;
		}
	}
	
	
	
//	public MongoClient noSqlConnection(String database_type, String db_url) {
//		if (database_type.equalsIgnoreCase("mongodb")) {
//	        return mongoConnection(db_url);
//		}
//		else {
//			return null;
//		}
//	}


//   MYSQL CONNECTION
	public Connection mysqlconnection(String username, String password, String db_url) throws SQLException {

		Connection con = DriverManager.getConnection(db_url, username, password);
		return con;

	}

//  POSTGRESQL CONNECTION
	public Connection postgreconnection(String username, String password, String db_url) throws SQLException {

		Connection con = DriverManager.getConnection(db_url, username, password);
		return con;

	}

//  MYSQL_LITE CONNECTION
	public Connection mysql_liteconnection(String username, String password, String db_url) throws SQLException {

		Connection con = DriverManager.getConnection(db_url, username, password);
		return con;

	}

//  MS_SQL CONNECTION
	public Connection ms_sqlconnection(String username, String password, String db_url) throws SQLException {

		Connection con = DriverManager.getConnection(db_url, username, password);
		return con;

	}

//  ORACLE CONNECTION
	public Connection oracleconnection(String username, String password, String db_url) throws SQLException {

		Connection con = DriverManager.getConnection(db_url, username, password);
		return con;

	}

//  MARIADB CONNECTION
	public Connection maria_dbconnection(String username, String password, String db_url) throws SQLException {

		Connection con = DriverManager.getConnection(db_url, username, password);
		return con;

	}

//	REDIS CONNECTION
//	@Bean
//	public RedisConnectionFactory connectionFactory(String host, Integer port, String hostname) {
////			String host="http://15.207.85.29";
//		RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
////		config.setHostName("localhost");
//		config.setHostName(hostname);
////		config.setPort(6379);
//		config.setPort(port);
//
//		System.out.println(config.getHostName());
//		return new LettuceConnectionFactory(config);
//
//	}

//  MONGODB CONNECTION
	public Connection mongodbconnection(String host, String port, String username, String password, String db_url)
			throws SQLException {

		Connection con = DriverManager.getConnection(db_url, username, password);

		return con;

	}
	
	
	
//	public MongoClient mongoConnection(String db_url) {
//        ConnectionString connectionString = new ConnectionString(db_url);
//        MongoClientSettings settings = MongoClientSettings.builder()
//                .applyConnectionString(connectionString)
//                .build();
//        MongoClient mongoClient = MongoClients.create(settings);
//        return mongoClient;
//    }
	
	
}
