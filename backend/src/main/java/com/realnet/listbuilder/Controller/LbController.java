package com.realnet.listbuilder.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.listbuilder.Entity.Lb_Header;
import com.realnet.listbuilder.Entity.Lb_Line;
import com.realnet.listbuilder.Repository.Lb_HeaderRepository;
import com.realnet.listbuilder.Service.Lb_HeaderService;

@RestController
@RequestMapping("/listbuilder/lb")
public class LbController {

	@Autowired
	private Lb_HeaderService headerService;

	@Autowired
	private Lb_HeaderRepository headerRepository;

	@PostMapping("/Savedata")

	public Lb_Header Savedata(@RequestBody Lb_Header Lb_Header) {
		Lb_Header dash = headerService.Savedata(Lb_Header);
		return dash;
	}

	@GetMapping("/get_lb_header")
	public List<Lb_Header> getdetails() {
		List<Lb_Header> dash = headerService.getdetails();
		return dash;
	}

	@GetMapping("/get_all_lines")
	public List<Lb_Line> get_all_lines() {
		List<Lb_Line> dash = headerService.get_all_lines();
		return dash;
	}

	@GetMapping("/get_module_id")
	public List<Lb_Header> get_by_module_id(@RequestParam(value = "module_id") int module_id) {

		List<Lb_Header> module = headerService.get_by_module_id(module_id);
		return module;

	}

	@GetMapping("/get_lb_headerbyid/{id}")
	public Lb_Header getdetailsbyId(@PathVariable int id) {
		Lb_Header dash = headerService.getdetailsbyId(id);
		return dash;
	}

	@PutMapping("/update_lb_header")
	public Lb_Header update_dashboard_header(@RequestBody Lb_Header Lb_Header) {
		Lb_Header dash = headerService.update_Lb_header(Lb_Header);
		return dash;
	}

//	update lb line by id

	@PutMapping("/update_Lb_Lineby_id/{id}")
	public Lb_Line update_Lb_Lineby_id(@PathVariable int id, @RequestBody Lb_Line Lb_Line) {

		Lb_Line dash = headerService.update_Lb_Lineby_id(id, Lb_Line);
		return dash;

	}

	@PostMapping("/update_Lb_Line")
	public Lb_Line update_Lb_Line(@RequestBody Lb_Line Lb_Line) {
		Lb_Line dash1 = headerService.update_Lb_Line(Lb_Line);
		return dash1;
	}

	@DeleteMapping("/delete_by_header_id/{id}")
	public void delete_by_id(@PathVariable int id) {
		headerService.delete_by_id(id);

	}

	// COUNT OF LIST BUILDER
	@GetMapping("/get_listbuilder/{module_id}")
	public ResponseEntity<?> getREPORT(@PathVariable Integer module_id) {
		String count_wireframe = headerRepository.count_lbheader(module_id);

		if (count_wireframe.isEmpty()) {
			return new ResponseEntity<>(0, HttpStatus.OK);

		} else {
			return new ResponseEntity<>(count_wireframe, HttpStatus.OK);

		}
	}

//		GET NUMBERS OF IDLIST

	@GetMapping("/getobject")
	public List<Object> getobject() {
		return this.headerRepository.findCount();

	}

}
