package com.ghbt.ghbt_starbucks.global.replica;

import java.util.HashMap;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;

@Configuration
public class DataSourceConfiguration {

        private static final String SOURCE_SERVER = "write";
        private static final String REPLICA_SERVER = "read";

        @Bean
        @Qualifier(SOURCE_SERVER)
        @ConfigurationProperties(prefix = "spring.datasource.write")
        public DataSource sourceDataSource() {
            return DataSourceBuilder.create()
                .build();
        }

        @Bean
        @Qualifier(REPLICA_SERVER)
        @ConfigurationProperties(prefix = "spring.datasource.read")
        public DataSource replicaDataSource() {
            return DataSourceBuilder.create()
                .build();
        }

        @Bean
        public DataSource routingDataSource(
            @Qualifier(SOURCE_SERVER) DataSource sourceDataSource,
            @Qualifier(REPLICA_SERVER) DataSource replicaDataSource
        ) {
                RoutingDataSource routingDataSource = new RoutingDataSource();

                HashMap<Object, Object> dataSourceMap = new HashMap<>();
                dataSourceMap.put("write", sourceDataSource);
                dataSourceMap.put("read", replicaDataSource);

                routingDataSource.setTargetDataSources(dataSourceMap);
                routingDataSource.setDefaultTargetDataSource(sourceDataSource);

                return routingDataSource;
        }

        @Bean
        @Primary
        public DataSource dataSource() {
                DataSource determinedDataSource = routingDataSource(sourceDataSource(), replicaDataSource());
                return new LazyConnectionDataSourceProxy(determinedDataSource);
        }

}
