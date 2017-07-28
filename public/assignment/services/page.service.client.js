/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService()
    {


        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;


            // TODO: should check if page exists? Nah, probably not.
        function createPage(websiteId, page)
        {



            // page._id =(new Date()).getTime() + "";
            // page.websiteId = websiteId;
            // pages.push(page);
        }


        function findPagesByWebsiteId(websiteId)
        {


            // console.log("Finding pages with websiteId "+websiteId);
            // var out = [];
            // for (var p in pages){
            //     var currentPage = pages[p];
            //     if(currentPage.websiteId === websiteId)
            //     {
            //         out.push( currentPage);
            //     }
            // }
            // console.log("found "+out.length+" pages.");
            // return out;
        }


        function findPageById(pageId)
        {



            // console.log("Finding page with Id "+pageId);
            // for (var p in pages){
            //     var currentPage = pages[p];
            //     if(currentPage._id === pageId)
            //     {
            //         console.log("found page "+currentPage.name);
            //         return currentPage;
            //     }
            // }
            // return null;
        }

        function updatePage(pageId, page)
        {




            // var oldPage = findPageById(pageId);
            // oldPage = page;
            // return page;
        }

        function deletePage(pageId)
        {



            // var pageToRemove = findPageById(pageId);
            // console.log("service: deleting page ");
            // console.log(pageToRemove);
            // /* Remove the user */
            // var index = pages.indexOf(pageToRemove);
            // console.log(index);
            // if (index > -1) {
            //     pages.splice(index, 1);
            // }
            // console.log(pages);
        }





    }
})();