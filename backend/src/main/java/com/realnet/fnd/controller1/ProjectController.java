package com.realnet.fnd.controller1;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realnet.Workspaceuser.Entity.Sec_workspace_users;
import com.realnet.fnd.entity.Rn_Project_Setup;
import com.realnet.fnd.repository.Rn_ProjectSetup_Repository;
import com.realnet.formdrag.repository.Rn_wf_lines_3Repository;
import com.realnet.icon.service.AgedService;
import com.realnet.icon.service.ArchivedService;
import com.realnet.icon.service.FavouriteService;
import com.realnet.icon.service.FuturisticService;
import com.realnet.icon.service.PinnedService;
import com.realnet.icon.service.StarService;
import com.realnet.icon.service.WatchListService;
import com.realnet.users.entity1.AppUser;
import com.realnet.users.service1.AppUserServiceImpl;

@RestController
@RequestMapping("/fnd/project")
@EnableCaching
public class ProjectController {
	@Autowired
	private Rn_ProjectSetup_Repository projectSetupRepository;

	@Autowired
	private FavouriteService favService;
	@Autowired
	private StarService starService;
	@Autowired
	private WatchListService watchService;
	@Autowired
	private FuturisticService futurService;
	@Autowired
	private PinnedService pinService;
	@Autowired
	private ArchivedService archService;
	@Autowired
	private AgedService ageService;
	@Autowired
	private Rn_wf_lines_3Repository repo;

	@Autowired
	private AppUserServiceImpl userService;

	// get all project in my project
	// @Cacheable(value = "myproject")
	@GetMapping("/myproject")
	public ResponseEntity<?> getmyproject() {
		AppUser loggedInUser = userService.getLoggedInUser();
		List<Rn_Project_Setup> myproject = projectSetupRepository.getmyproject(loggedInUser.getUserId());
		myproject.forEach(o -> {
			o.setFavCnt(favService.getFavCount(o.getId()));
			o.setIs_fav(favService.IsFav(o.getId(), o.getCreatedBy()));
			o.setStaredCnt(starService.getStarCount(o.getId()));
			o.setIs_stared(starService.IsStar(o.getId(), o.getCreatedBy()));
			o.setWatchlistedCnt(watchService.getWatchlistCount(o.getId()));
			o.setIs_watchlisted(watchService.IsWatchlist(o.getId(), o.getCreatedBy()));
			o.setFuturisticCnt(futurService.getFuturisticCount(o.getId()));
			o.setIs_futuristic(futurService.IsFuturistic(o.getId(), o.getCreatedBy()));
			o.setPinnedCnt(pinService.getPinnedCount(o.getId()));
			o.setIs_pinned(pinService.IsPinned(o.getId(), o.getCreatedBy()));
			o.setIs_archived(archService.IsArchived(o.getId(), o.getCreatedBy()));
			o.setIs_aged(ageService.IsAged(o.getId(), o.getCreatedBy()));
		});
		return new ResponseEntity<>(myproject, HttpStatus.OK);

	}

	@GetMapping("/count_wfline3")
	public ResponseEntity<?> countEntitywfline() {
		long count = repo.count();
//		Object count = repo.count_wfline();
		return new ResponseEntity<>(count, HttpStatus.OK);

	}

}
