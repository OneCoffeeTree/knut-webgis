package com.mangosystem.knutwebgis.persistence;

import com.mangosystem.knutwebgis.domain.Block;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlockMapper {

    /** 블록 목록 조회 **/
    List<Block> getBlockList(Block block);
}
