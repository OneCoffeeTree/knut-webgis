package com.mangosystem.knutwebgis.service.impl;

import com.mangosystem.knutwebgis.domain.Block;
import com.mangosystem.knutwebgis.persistence.BlockMapper;
import com.mangosystem.knutwebgis.service.BlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BlockServiceImpl implements BlockService {

    @Autowired
    BlockMapper blockMapper;

    /** 블록 목록 조회 **/
    @Transactional(readOnly = true)
    public List<Block> getBlockList(Block block) {
        List<Block> list = blockMapper.getBlockList(block);
        return list;
    }
}
