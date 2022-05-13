package com.realnet.fnd.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.realnet.comm.entity.PlayEntity2;


public interface PlayService2 
{
	public Page<PlayEntity2> getlist(Pageable page);
    public PlayEntity2 createCollageStudent(PlayEntity2 data);
    public PlayEntity2 getid(int id);
    public PlayEntity2 updateById(int id, PlayEntity2 collegePortalEntity);
    public boolean deleteById(int id);
    
    public PlayEntity2 getwf_instance_id(int id);
    public PlayEntity2 updateBywf_instance_id(int id, PlayEntity2 collegePortalEntity);
}
