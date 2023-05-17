package com.realnet.Wf_library.Controllers;

import java.security.KeyStore.PrivateKeyEntry;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.ProjectManagement.Service.UserService;
import com.realnet.Wf_library.Entity.Wf_library_t;
import com.realnet.Wf_library.Repository.Wf_library_Repository;
import com.realnet.fnd.entity.Rn_Module_Setup;
import com.realnet.fnd.repository.Rn_ModuleSetup_Repository;
import com.realnet.formdrag.entity.Rn_wf_lines_3;
import com.realnet.formdrag.repository.Rn_wf_lines_3Repository;
import com.realnet.users.entity1.AppUser;
import com.realnet.users.service1.AppUserService;
import com.realnet.wfb.entity.Rn_Fb_Header;
import com.realnet.wfb.entity.Rn_Fb_Line;
import com.realnet.wfb.repository.Rn_Fb_Header_Repository;

@RestController
@RequestMapping("/wflibrary/copylib")
public class CopyLibrary {

	@Autowired
	private Rn_wf_lines_3Repository repo;

	@Autowired
	private Rn_Fb_Header_Repository header_Repository;

	@Autowired
	private AppUserService userService;

	@Autowired
	private Wf_library_Repository library_Repository;

	@Autowired
	private Rn_ModuleSetup_Repository moduleSetup_Repository;

//	COPY WIREFRAME TO LIBRARY or ADD TO LIBRARY
	@GetMapping("/copy_library/{id}")
	public Wf_library_t copytolibrary(@PathVariable Integer id) {

		AppUser loggedInUser = userService.getLoggedInUser();
		Rn_Fb_Header oldHeader = header_Repository.findById(id).get();
		Wf_library_t library_t = new Wf_library_t();

		library_t.setCreatedBy(loggedInUser.getUserId());
		library_t.setTechStack(oldHeader.getTechStack());
		library_t.setObjectType(oldHeader.getObjectType());
		library_t.setSubObjectType(oldHeader.getSubObjectType());
		library_t.setUiName(oldHeader.getUiName());
		library_t.setFormType(oldHeader.getFormType());
		library_t.setFormCode(oldHeader.getFormCode());
		library_t.setTableName(oldHeader.getTableName());
		library_t.setLineTableName(oldHeader.getLineTableName());
		library_t.setMultilineTableName(oldHeader.getMultilineTableName());
		library_t.setJspName(oldHeader.getJspName());
		library_t.setControllerName(oldHeader.getControllerName());
		library_t.setServiceName(oldHeader.getServiceName());
		library_t.setServiceImplName(oldHeader.getServiceImplName());
		library_t.setDaoName(oldHeader.getDaoName());
		library_t.setDaoImplName(oldHeader.getDaoImplName());
		library_t.setBuild(false);
		library_t.setUpdated(oldHeader.isUpdated());
		library_t.setMenuName(oldHeader.getMenuName());
		library_t.setHeaderName(oldHeader.getHeaderName());
		library_t.setConvertedTableName(oldHeader.getControllerName());
		library_t.setTesting(true);

		Rn_wf_lines_3 wf_lines_3 = repo.findheader(oldHeader.getId()).orElseThrow(null);

		library_t.setModel(wf_lines_3.getModel());
		Wf_library_t save = library_Repository.save(library_t);

		return save;
	}

//	COPY  LIBRARY TO WIREFRAME
	@GetMapping("/copy_library/{id}/{module_id}")
	public Rn_Fb_Header copytowireframe(@PathVariable Long id, @PathVariable Integer module_id) {

		AppUser loggedInUser = userService.getLoggedInUser();
		Long userId = loggedInUser.getUserId();

		Wf_library_t oldHeader = library_Repository.findById(id).get();
		Rn_Fb_Header newHeader = new Rn_Fb_Header();

		newHeader.setCreatedBy(userId);
//		newHeader.setAccountId(accId);
		newHeader.setTechStack(oldHeader.getTechStack());
		newHeader.setObjectType(oldHeader.getObjectType());
		newHeader.setSubObjectType(oldHeader.getSubObjectType());
		newHeader.setUiName(oldHeader.getUiName());
		newHeader.setFormType(oldHeader.getFormType());
		newHeader.setFormCode(oldHeader.getFormCode());
		newHeader.setTableName(oldHeader.getTableName());
		newHeader.setLineTableName(oldHeader.getLineTableName());
		newHeader.setMultilineTableName(oldHeader.getMultilineTableName());
		newHeader.setJspName(oldHeader.getJspName());
		newHeader.setControllerName(oldHeader.getControllerName());
		newHeader.setServiceName(oldHeader.getServiceName());
		newHeader.setServiceImplName(oldHeader.getServiceImplName());
		newHeader.setDaoName(oldHeader.getDaoName());
		newHeader.setDaoImplName(oldHeader.getDaoImplName());
		newHeader.setBuild(false);
		newHeader.setUpdated(oldHeader.isUpdated());
		newHeader.setMenuName(oldHeader.getMenuName());
		newHeader.setHeaderName(oldHeader.getHeaderName());
		newHeader.setConvertedTableName(oldHeader.getControllerName());
		newHeader.setTesting(true);

		Rn_Module_Setup module_Setup = moduleSetup_Repository.findById(module_id).get();
		newHeader.setModule(module_Setup); // change
		// newHeader.setRn_cff_actionBuilder(oldHeader.getRn_cff_actionBuilder());

		Rn_Fb_Header savedHeader = header_Repository.save(newHeader);
		try {

			Rn_wf_lines_3 wf_lines_3 = repo.findheader(savedHeader.getId()).orElseThrow(null);
			Rn_wf_lines_3 lines_3 = new Rn_wf_lines_3();
			lines_3.setHeader_id(savedHeader.getId());
			lines_3.setModel(wf_lines_3.getModel());
			repo.save(lines_3);
		} catch (Exception e) {
			// TODO: handle exception
		}

		return savedHeader;
	}

}
