package com.mangosystem.knutwebgis.controller;

import com.mangosystem.knutwebgis.domain.Block;
import com.mangosystem.knutwebgis.service.BlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.wololo.geojson.GeoJSON;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/")
public class BlockController {

    @Autowired
    BlockService blockService;

    @GetMapping(value="/")
    public ModelAndView index(HttpServletRequest request, Model model) {
        model.addAttribute("data", "");
        return new ModelAndView("/index");
    }

    @RequestMapping(value="/block", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> getBlockInfoList(Block block) {
        String list = blockService.getBlockList(block);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
