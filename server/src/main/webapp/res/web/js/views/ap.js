/*
   Copyright 2012 IBM

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.APView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('ap'));
        this.model.bind("change", this.render, this);
        this.model.bind("add", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).find('#radio-list').html(new RadioListView({model:this.model.radios}).render().el);
        return this;
    }

});

window.APListView = Backbone.View.extend({

    initialize:function () {
        var self = this;
        this.template = _.template(tpl.get('ap-list'));
        this.model.bind("change", this.render, this);
        this.model.bind("add", this.render, this);
        this.model.bind("remove", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template({naps:hl.length}));
        _.each(this.model.models, function (h) {
            $(this.el).find('table.ap-table > tbody')
                .append(new APListItemView({model:h}).render().el);
        }, this);
        return this;
    }
});

window.APListItemView = Backbone.View.extend({

    tagName:"tr",

    initialize:function () {
        this.template = _.template(tpl.get('ap-list-item'));
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});