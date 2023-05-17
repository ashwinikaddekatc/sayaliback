package com.realnet.Wf_library.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.realnet.Wf_library.Entity.Wf_library_t;

@Repository
public interface Wf_library_Repository extends JpaRepository<Wf_library_t, Long> {
}