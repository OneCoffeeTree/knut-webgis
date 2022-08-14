package com.mangosystem.knutwebgis.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class Block {
    private String BlockId;
    private String jibunId;
    private String geom;
    private String blockType;
}
