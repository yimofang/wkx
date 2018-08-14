package net.emof.building.web.controller;

import net.emof.building.util.DataMap;
import net.emof.building.web.service.ConfsType_web_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Copyright (C), 2015-2017, 易魔方有限公司
 * FileName: ConfsType_web_Controller
 * Author:   anshiyuan
 * Date:     2017/12/14 下午1:44
 * Description: 会议类型 会议类型列表
 * History:
 */
@Controller
@RequestMapping("/confsType_web")
public class ConfsType_web_Controller {
    @Autowired
    private ConfsType_web_Service ctws;

    @ResponseBody
    @RequestMapping(value = "/listpage", method = RequestMethod.POST)
    public Map<String, Object> getConfsTypeList() {
        DataMap list = ctws.getConfsTypeList();
        return list.data;
    }
}