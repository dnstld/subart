var SubArt = {
	/**
     * instances
     * @access public
     * @desc instancias
     *
     * @type {Object}
     */
	instances: {},
	/**
     * variables
     * @access public
     * @desc variaveis
     *
     * @type {Object}
     */
	variables: {
		btnOpen: $(".btn-open-menu"),
		btnClose: $(".btn-close-menu"),
		menu: $("nav")
	},
	/**
     * init
     * @access public
     * @desc inicializa
     *
     * @return {Void}
     */
	init: function() {
		"use strict";
		
		SubArt.alturaPaginaInicial();
		SubArt.menuOpen();
		SubArt.inineSVG();
        SubArt.onResize();
		SubArt.loadImages();
	},
	/**
     * alturaPaginaInicial
     * @access public
     * @desc define altura da pagina inicial
     *
     * @return {Void}
     */
    alturaPaginaInicial: function() {
        "use strict";

        var altura = $(window).height();

        $(".inicio").css("height", altura);
    },
    /**
     * menuOpen
     * @access public
     * @desc abre o menu
     *
     * @return {Void}
     */
    menuOpen: function() {
    	"use strict";

    	SubArt.variables.btnOpen.on("click", function(e) {
    		e.preventDefault();

    		$(this).fadeOut("fast");
    		SubArt.variables.menu.fadeIn("slow");
    		SubArt.variables.btnClose.fadeIn("slow");

    		SubArt.menuClose();
    	});

    },
    /**
     * menuClose
     * @access public
     * @desc fecha o menu
     *
     * @return {Void}
     */
    menuClose: function() {
    	"use strict";

    	SubArt.variables.btnClose.on("click", function(e) {
    		e.preventDefault();

    		$(this).fadeOut("fast");
    		SubArt.variables.menu.fadeOut("slow");
    		SubArt.variables.btnOpen.fadeIn("slow");

    		SubArt.menuOpen();
    	});
    },
    /**
     * inineSVG
     * @access public
     * @desc troca arquivo.svg para svg inline
     *
     * @return {Void}
     */
    inineSVG: function() {
        "use strict";

        $("img.svg").each(function() {
            var img = $(this),
                imgClass = img.attr("class"),
                imgID = img.attr("id"),
                imgURL = img.attr("src");
            
            $.get(imgURL, function(data) {
                var svg = $(data).find("svg");

                if (typeof imgID !== "undefined") {
                    svg = svg.attr("id", imgID);
                }

                if (typeof imgClass !== "undefined") {
                    svg = svg.attr("class", imgClass);
                }

                svg = svg.removeAttr("xmlns:a");
                img.replaceWith(svg);
            });
        });
    },
    /**
     * onResize
     * @access public
     * @desc recarrega a pagina quando redimensionado
     *
     * @return {Void}
     */
    onResize: function() {
        "use strict";

	    $(window).on("resize" ,function() {
	    	location.reload();
	    });
    },
    /**
     * loadImages
     * @access public
     * @desc carrega as imagens quando estiverem visivel
     *
     * @return {Void}
     */
    loadImages: function() {
        "use strict";

        $("img.lazy").jail({
            effect: "fadeIn",
            speed: 1000
        });
    }
}
/**
 * document ready
 * @desc quando o documento estiver pronto...
 */
$(document).on("ready", function() {
	"use strict";

    SubArt.init();
});
/**
 * window load
 * @desc remove o loader
 * @desc volta para o inicio quando recarregar a pagina
 */
$(window).on("load", function() {
    "use strict";

    // loader
    $("#loader").fadeOut("slow");

    // va para o inicio
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
});