package com.realnet.icon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.realnet.icon.entity.FavouriteEntity;

@Repository
public interface FavouriteRepository  extends JpaRepository<FavouriteEntity,Integer>{
	
     @Query(value="SELECT count(*) from favourite where object_id=?1",nativeQuery = true)
     int countFav(int projectId);
     
     @Query(value="SELECT count(*) from favourite where object_id=?1 AND created_by=?2",nativeQuery = true)
     int IsFav(int projectId, Long userId);
     
}