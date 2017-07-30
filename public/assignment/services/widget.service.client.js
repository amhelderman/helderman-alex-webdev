/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http)
    {

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        function createWidget(userId, websiteId, pageId, widget)
        {
            var url =  "/api/user/"+userId
                        +"/website/"+websiteId
                        +"/page/"+pageId
                        +"/widget/";
            console.log("widget service: posting widget using url:");
            console.log(url);
            return $http.post(url, widget);
        }


        function updateWidget(userId, websiteId, pageId, widgetId, widget)
        {
            var url =  "/api/user/"+userId
                +"/website/"+websiteId
                +"/page/"+pageId
                +"/widget/"+widgetId;
            console.log("widget service: updating widget using url:");
            console.log(url);
            return $http.put(url, widget);
        }

        function deleteWidget(userId, websiteId, pageId, widgetId)
        {
            var url =  "/api/user/"+userId
                +"/website/"+websiteId
                +"/page/"+pageId
                +"/widget/"+widgetId;
            console.log("widget service: deleting widget using url:");
            console.log(url);
            return $http.delete(url);
        }


        function findWidgetsByPageId(userId, websiteId, pageId)
        {

            var url =  "/api/user/"+userId
                +"/website/"+websiteId
                +"/page/"+pageId
                +"/widget/";
            console.log("widget service: finding widgets using url:");
            console.log(url);
            return $http.get(url);
        }

        function findWidgetById(userId, websiteId, pageId, widgetId)
        {
            var url =  "/api/user/"+userId
                +"/website/"+websiteId
                +"/page/"+pageId
                +"/widget/"+widgetId;
            console.log("widget service: find widget by Id using url:");
            console.log(url);
            return $http.get(url);
        }




    }
})();