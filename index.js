/**
 * https://svg.brucewar.me/3.%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84SVG%E7%A4%BA%E4%BE%8B.html
 */

var SvgTool = {
    svgCount: 1,
    createSvgChild: function (svgName) {
        var count = ++this.svgCount;
        var svgEle = document.createElementNS('http://www.w3.org/2000/svg', svgName);
        svgEle.setAttribute('id', svgName + '-' + count);
        return svgEle;
    },

    getAttributeData: function (svgInstance, attr) {
        return svgInstance.getAttribute(attr);
    },

    setAttributeData: function (svgInstance, attributeData) {
        
        attributeData.forEach(function (item) {
            svgInstance.setAttribute(item.key, item.value);
        });
        return svgInstance;
    },

    createAnimateEle: function (width) {
        var animateEle = this.createSvgChild('animate');
        animateEle.setAttribute('attributeName', 'width');
        animateEle.setAttribute('attributeType', 'XML');
        animateEle.setAttribute('from', '0');
        animateEle.setAttribute('to', width);
        animateEle.setAttribute('begin', '0s');
        animateEle.setAttribute('dur', '5s');
        return animateEle;
    }

}

var FormTool = {
    data: {
        rect: ['x', 'y', 'width', 'height', 'style'],
        circle: ['x', 'y', 'rx', 'ry', 'style'],
    },
    createForm: function (type, id, initAttributeData) {
        var attributeArr = this.data[type];
        var that = this;
        var formsStrArr = [
            '<div id="' + id + '" class="form-config">',
        ];
        attributeArr.forEach(function (value, index) {
            formsStrArr.push(that.createInput(value, initAttributeData));
        });
        [].push.apply(formsStrArr, [
            '<div>',
            '<button>',
            'ok',
            '</button>',
            '</div>',
            '</div>'
        ]);
        return formsStrArr.join('');
    },
    transformInitData: function (initAttributeData) {
        var obj = {};
        initAttributeData.forEach(function (value) {
            obj[value.key] = value.value;
        });
        return obj;
    },
    createInput: function (name, initAttributeData) {
        var initData = this.transformInitData(initAttributeData);
        var value = initData[name] || '';
        var strArr = [
            '<div class="label-wraper">',
            '<label>' + name,
            '</label>',
            '<input type="text" name="' + name + '"value="' + value + '">',
            '</div>'
        ];
        return strArr.join('');
    },

    getFormData: function ($formWraper) {
        var objArr = [];
        var name = '';
        var value = '';
        $formWraper.find('input').forEach(function (value) {

            var name = $(value).attr('name')
            var value = $(value).val();
            if (name && value) {
                objArr.push({
                    key: name,
                    value: value,
                });
            }

        });
        return objArr;
    }


}