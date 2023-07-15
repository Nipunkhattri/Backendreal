const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 150,
    },
    location: {
        type: String,
        required: true,
        maxlength: 150,
    },
    units: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    card_image_url: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    unitVariants: {
        type: String,
        required: true,
    },
    logo_url: {
        type: String,
        required: true,
    },
    hero_img_url: {
        type: String,
        required: true,
    },
    hero_img_title: {
        type: String,
        required: true,
    },
    overview: {
        heading: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    gallerySliderImages: [{
        type: String
    }],
    projectDetails: [{
        icon_url: {
            type: String,
        },
        heading: {
            type: String,
        },
        heading_value: {
            type: String,
        }
    }],
    unit_and_price: [{
        type: {
            type: String,
        },
        subtype: {
            type: String,
        },
        sbua: {
            type: String,
        },
        price: {
            type: String,
        },
        floor_plan_img: {
            type: String,
        }
    }],
    floor_plans: [{
        img_url: {
            type: String,
        },
        title: {
            type: String,
        }
    }],
    master_plan_img_url: {
        type: String,
        required: true,
    },
    amenities: [{
        title: {
            type: String,
        },
        img_url: {
            type: String,
        }
    }],
    specifications: {
        heading: {
            type: String
        },
        content: {
            structure: {
                heading: {
                    type: String,
                },
                img_url: {
                    type: String,
                },
                content: [{
                    type: String,
                }]
            },
            flooring: {
                heading: {
                    type: String,
                },
                img_url: {
                    type: String,
                },
                content: [{
                    type: String,
                }]
            },
            doors: {
                heading: {
                    type: String,
                },
                img_url: {
                    type: String,
                },
                content: [{
                    type: String,
                }]
            },
            plumbing_and_sanitary: {
                heading: {
                    type: String,
                },
                img_url: {
                    type: String,
                },
                content: [{
                    type: String,
                }]
            },
            security: {
                heading: {
                    type: String,
                },
                img_url: {
                    type: String,
                },
                content: [{
                    type: String,
                }]
            },
            electrical: {
                heading: {
                    type: String,
                },
                img_url: {
                    type: String,
                },
                content: [{
                    type: String,
                }]
            }
        }
    },
    yt_link: {
        type: String,
        required: true,
    },
    location_section: {
        map_link: {
            type: String,
        },
        map_img_url: {
            type: String,
        },
        content: {
            type: String,
        }
    },
    about_section: {
        heading: {
            type: String
        },
        builder_logo_url: {
            type: String
        },
        content: {
            type: String
        },
        ongoing: {
            type: String,
        },
        upcoming: {
            type: String,
        },
        completed: {
            type: String,
        },
    },
    faqs: {
        faq1: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        },
        faq2: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        },
        faq3: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        },
        faq4: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        },
        faq5: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        },
        faq6: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        },
        faq7: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        },
        faq8: {
            q: {
                type: String,
            },
            a: {
                type: String,
            }
        }
    },
    reviews: {
        heading: {
            type: String,
        },
        rating: {
            type: Number,
        }
    },
    new_launch: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    subcategory: {
        type: String,
        required: true,
        lowercase: true
    },
    hero_card: {
        heading: {
            type: String
        },
        location: {
            type: String
        },
        builder_name: {
            type: String
        },
        open_space: {
            type: String
        },
        units: {
            type: String
        },
        possession: {
            type: String
        },
        nearby_location: {
            type: String
        },
        line1_data: {
            type: String
        },
        line2_data: {
            type: String
        },
        line3_data: {
            type: String
        },
        line4_data: {
            type: String
        },
        line5_data: {
            type: String
        },
    },
    yt_videos: [{
        type: String,
    }],
    master_plan_gallery: [{
        type: String
    }],
    location_map_gallery: [{
        type: String
    }],
    header_btn_color_codes: {
        under_construction: {
            subcategory: {
                type: String,
                default: "under construction"
            },
            color_code: {
                type: String,
            }
        },
        new_launch: {
            subcategory: {
                type: String,
                default: "new launch"
            },
            color_code: {
                type: String,
            }
        },
        ready_to_move_in: {
            subcategory: {
                type: String,
                default: "ready to move in"
            },
            color_code: {
                type: String,
            }
        },
        possession: {
            subcategory: {
                type: String,
                default: "possession"
            },
            color_code: {
                type: String,
            }
        }
    },
    location_points: {
        hospital: [{
            type: String
        }],
        schools: [{
            type: String
        }],
        landmarks: [{
            type: String
        }],
        nearby: [{
            type: String
        }],
        others: [{
            type: String
        }],
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Property', propertySchema);