package com.realnet.formio.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.realnet.formio.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

//	public List<Column> getColumnsOfBoard(Column column);
}
