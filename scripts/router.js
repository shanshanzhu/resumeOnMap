define(["model/app", "view/appView",
  "backbone","jquery"], function(app, appView){
    var data = [
      {"feature":"education","content":[[1999,{"summary-fn-org":{"undefined":"Peking University"},"details-education":{"degree":"B.Sc.","major":"Life Sciences"},"period":{"dtstart":"1999","dtend":"2003"},"desc-details-education":""}],[2004,{"summary-fn-org":{"undefined":"The University of British Columbia"},"details-education":{"degree":"PhD","major":"Neuroscience"},"period":{"dtstart":"2004","dtend":"2011"},"desc-details-education":"•\tCofounder and vice president of the UBC Biology Network for Chinese Scholars (2009-2011).\n•\tSport coordinator for UBC Neuroscience Graduate Student Association (2009-2011).\n•       Receptionist for International 3D Microscopy course (2006).","desc-details-education-activities":"Activities and Societies:\nUBC Neuroscience Graduate Student Association, Student Biotechnology Network"}],[2013,{"summary-fn-org":{"undefined":"University of California, Berkeley"},"details-education":{"degree":"Berkeley summer course","major":"Neuroscience data mining and modeling"},"period":{"dtstart":"2013","dtend":"2013"},"desc-details-education":"http://crcns.org/course\nApplied Matlab and Python in the following areas:\n-    Statistical thinking in neuroscience: Theory of model fitting / regularization / hypothesis testing; Bayesian methods; Spike sorting; Regression methods; Spike-triggered covariance; Variance analysis of neural response; Estimation of SNR, Coherence.\n-    Information theoretic approaches:Information transmission rates and maximally informative dimensions; Scene statistics approaches and neural modeling."}]]},
      {"feature":"experience","content":[[2001.1,{"include":"","postitle":{"false":{"title":"Research Assistant"},"company-profile-public":{"org-summary":"Peking University"}},"orgstats-organization-details-past-position":"Educational Institution; 1001-5000 employees;\n\t  \t      Research industry","period":{"dtstart":"October 2001","dtend":"July 2003","duration":{"value-title":""},"location":"Beijing City, China"},"description-past-position":"Created database to record long-term behavioral data in hibernation and pain models; Experience in statistical inference from biological data."}],[2003.08,{"include":"","postitle":{"false":{"title":"Laboratory Manager"},"company-profile-public":{"org-summary":"Institute of Neuroscience (ION), Chinese Academy of Sciences, Shanghai"}},"orgstats-organization-details-past-position":"Educational Institution; 201-500 employees;\n\t  \t      Research industry","period":{"dtstart":"August 2003","dtend":"August 2004","duration":{"value-title":""},"location":"Shanghai City, China"},"description-past-position":"Created inventory database; Familiar with java codes in ImageJ for quantifying regional graphic intensity; Applied SPSS for linear statistical models and association analysis."}],[2004.09,{"include":"","postitle":{"false":{"title":"PhD Research Scholar"},"company-profile-public":{"org-summary":"The University of British Columbia"}},"orgstats-organization-details-past-position":"Educational Institution; 10,001+ employees;\n\t  \t      Higher Education industry","period":{"dtstart":"September 2004","dtend":"December 2011","duration":{"value-title":""},"location":"Vancouver, Canada Area"},"description-past-position":"Research on the pathogenesis of epilepsy, neuroinflammation and neurodegenerative disorders.\n- Proficient with MatLab and SPSS to analyze biological data by linear regression, generalized\nlinear models, and correlation analysis.\n- Experience in Python/Jython codes in ImageJ for analyzing 2D images showing blob-like and\nbranching type structure of brain cells.\n- Published 5 peer-reviewed papers including 2 first-author papers, with 45 citations recorded in Google Scholar.\n- Won the Canadian Savoy Foundation Scholarship, $32, 000 (2009-2011)."}],[2010.12,{"include":"","postitle":{"false":{"title":"Co-founder"},"org-summary":"WeeToo.Inc"},"orgstats-organization-details-past-position":"","period":{"dtstart":"December 2010","dtend":"June 2011","duration":{"value-title":""},"location":"Vancouver, Canada Area"},"description-past-position":"•\tLAMP-based web system for affiliate business\n•\tRecruited 215 users.Revenue reached $30,000 in six months."}],[2012.1,{"include":"","postitle":{"false":{"title":"Research Data Analyst"},"company-profile-public":{"org-summary":"Seattle Children's"}},"orgstats-organization-details-past-position":"Nonprofit; 1001-5000 employees;\n\t  \t      Hospital & Health Care industry","period":{"dtstart":"October 2012","dtend":"September 2013","duration":{"value-title":""},"location":"Greater Seattle Area"},"description-past-position":"-  Worked in the FARSIGHT software development team \"https://github.com/hocheung20/farsight\"\nFARSIGHT automatically counts and traces the morphology of brain cells in 3D images: Lead a project to develop the program that align multiple 3D images of the same brain area showing blob or trace structure; Write Python, MatLab, Jython and XML codes for image processing and batch operation; Participate in correlation and clustering of morphology feature data sets; Familiar with C++ and python codes used in FARSIGHT.\n- Participate in developing novel UTAH microelectrode arrays and Michigan NeuroNexus probes that minimize tissue responses: Set up stages to measure impedance and cortical signal from MEMS devices; Write MatLab codes for measuring and analyzing electrical signals. \n- Participate in correlating imaging features of brain cells with electrophysiological responses in brains implanted with MEMS devices with various design features. \n- Develop imaging tools that combine pattern recognition, data clustering, and conventional staining methods to optimize multi-color staining of brain slices. \n- Apply SPSS and MatLab for progression tree analysis and clustering analysis of branching feature data collected from 3D images. \n- Deliver 4 posters and 1 presentation in the field of imaging and data analysis."}],[2013.09,{"include":"","postitle":{"false":{"title":"Software Engineer"},"company-profile-public":{"org-summary":"Hack Reactor"}},"orgstats-organization-details-current-position":"Educational Institution; 11-50 employees;\n\t  \t      Computer Software industry","period":{"dtstart":"September 2013","dtstamp":"Present","duration":{"value-title":""},"location":"San Francisco Bay Area"},"description-current-position":"Hacking 80 hours per week with following skill sets:\n\n- NodeJS/ExpressJS\n- MongoDB/Mongoose\n- SQL/Sequelize\n- AngularJS/BackboneJS\n- D3.js/NVD3.js\n- HTML5/CSS3\n- Git\n- Pair programming/scrum calls"}],[2013.1,{"include":"","postitle":{"false":{"title":"Contract Software Engineer"},"company-profile-public":{"org-summary":"Versal"}},"orgstats-organization-details-past-position":"Privately Held; 11-50 employees;\n\t  \t      Internet industry","period":{"dtstart":"October 2013","dtend":"November 2013","duration":{"value-title":""},"location":"San Francisco Bay Area"},"description-past-position":"Built a functional deep diagramming gadget from scratch with a two-person team in three weeks.\n \n- Set up front-end app structure in BackboneJS, RequireJS and Raphael JS\n- Implemented photo-tagging algorithms\n- Created join table for relational data queries between image objects and tag/flashcard objects\n- Implemented scoring algorithm for user performance \n- Integration to the Versal API in the backend\n- Test-driven development with the MochaJS \n- Stylus/CSS3/HTML5 \n- Project management with Asana\n- Held daily scrum meeting with senior software engineer, project manager, web designer and product designer from Versal to ensure completion of milestones.\n- Paid Contractor work\n\nNote: Product is released on Versal.com."}]] }
    ];
    //this data object represents the data scraped from the linkedIn profile page at local server;

  var Router = Backbone.Router.extend({
    
    routes: {
      "": "home",
      "submiturl": "renderTextTag",
      "resume/:query": "getResume"
    },
//you still need a hash sign to trigger the router, but it is not shown.

    initialize: function() {
      this.app = new app();//it is actually a collection
      this.homeView = new appView({
        model: this.app,
        el: $('.container')
      });
      this.app.get('categories').reset(data);
    },

    home: function() {
      this.homeView.render();
    },

    renderTextTag: function(data) {
      console.log('ah')
      console.log(data);
    },

    getResume: function(query) {
      console.log(query);
      //check if fetch gets into the models
      this.app.fetch({
        data: {
          id: query
        }
        // },
        // success: function(data) {
        //   this.resumeView.render(data);
        // }
      });

    },

  });

  return Router;

}); 