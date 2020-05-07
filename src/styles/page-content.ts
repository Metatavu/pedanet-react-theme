import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  /**
   * Page styles
   */
  root: {
    "&.article": {
      [theme.breakpoints.up("sm")]: {
        width: "90vw",
      },
      [theme.breakpoints.up("md")]: {
        width: "80vw",
      },
      [theme.breakpoints.up("lg")]: {
        width: "60vw",
      },
      [theme.breakpoints.up("xl")]: {
        width: "50vw",
        maxWidth: "960px"
      }
    },
    "&.smallgutter": {
      [theme.breakpoints.up("sm")]: {
        width: "90vw",
      },
      [theme.breakpoints.up("md")]: {
        width: "80vw",
      },
      [theme.breakpoints.up("lg")]: {
        width: "60vw",
      },
      [theme.breakpoints.up("xl")]: {
        width: "50vw",
        maxWidth: "960px"
      }
    }
  },
  hero: {
    paddingTop: 130,
    height: "90vh",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      height: "90vh",
    },
    "& button": {
      [theme.breakpoints.up("md")]: {
        width: 300
      }
    },
    "& .wp-block-cover": {
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      "&.has-background-dim.hero": {
        "&:before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }
      },
      "& .wp-block-cover__video-background": {
        minWidth: "100%",
        minHeight: "100%",
        [theme.breakpoints.down("sm")]: {
          height: "100%"
        }
      }
    }
  },
  heroContentContainer: {
    marginLeft: "5%",
    marginRight: "5%",
    [theme.breakpoints.up("md")]: {
      width: "70vw",
      marginRight: 0,
    },
    [theme.breakpoints.up("lg")]: {
      width: "75vw",
    },
    [theme.breakpoints.up("xl")]: {
      width: "60vw",
    },
    "& p": {
      fontSize: 16,
      fontFamily: theme.typography.subtitle2.fontFamily,
      margin: 0,
      [theme.breakpoints.up("lg")]: {
        fontSize: 18,
        lineHeight: 1.75
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: 20,
        lineHeight: 1.75
      }
    }
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
    marginTop: 100,
    [theme.breakpoints.up("md")]: {
      marginTop: 130,
    },
    display: "flex",
    flexDirection: "column"
  },
  contentWithHero: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
    marginTop: 0,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: "normal",
    fontSize: "2.5rem",
    lineHeight: 1,
    [theme.breakpoints.up(360)]: {
      fontSize: "2.75rem"
    },
    [theme.breakpoints.up(413)]: {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "4rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4rem"
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "4rem"
    },
    [theme.breakpoints.up(1367)]: {
      fontSize: "4.5rem"
    },
    [theme.breakpoints.up(1600)]: {
      fontSize: "5rem"
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "6rem",
      lineHeight: "6.75rem",
    },
    [theme.breakpoints.up(2000)]: {
      fontSize: "7rem"
    },
    "&.article": {
      textAlign: "left",
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
        lineHeight: "2.5rem"
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "2.5rem",
        lineHeight: "3rem"
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: "3rem",
        lineHeight: "3.5rem"
      },
    }
  },
  heroTitle: {
    margin: 0,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: "normal",
    fontSize: "2.5rem",
    lineHeight: 1,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up(360)]: {
      fontSize: "2.75rem"
    },
    [theme.breakpoints.up(413)]: {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "4rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4rem"
    },
    // Media queries require single quotes
    // tslint:disable-next-line: quotemark
    '@media only screen and (max-width:1280px) and (min-width:960px) and (max-height:750px)': {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "4rem",
      marginLeft: "-6px"
    },
    [theme.breakpoints.up(1367)]: {
      fontSize: "4.5rem",
      marginLeft: "-7px"
    },
    [theme.breakpoints.up(1600)]: {
      fontSize: "5rem"
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "6rem",
      lineHeight: "6.75rem",
      marginLeft: "-8px"
    },
    [theme.breakpoints.up(2000)]: {
      fontSize: "7rem",
      marginLeft: "-9px"
    },
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      width: "auto",
    }
  },
  errorText: {},
  /**
   * HTML Content styles
   */
  date: {
    fontFamily: theme.typography.h1.fontFamily,
    "&:first-letter": {
      textTransform: "uppercase"
    }
  },
  htmlContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: theme.spacing(10),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up("xl")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(10),
    },
    "& .wp-block-group": {
      [theme.breakpoints.up("md")]: {
        width: "80%",
        alignSelf: "center",
      },
      [theme.breakpoints.up("xl")]: {
        width: "75%"
      },
      "& .MuiButton-outlinedPrimary": {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark
      }
    },
    "& .address-heading": {
      fontSize: 20,
      margin: 0,
      [theme.breakpoints.up("md")]: {
        fontSize: "2.75rem",
      }
    },
    "& a": {
      fontFamily: theme.typography.h1.fontFamily,
      fontWeight: "normal",
      color: theme.palette.primary.dark
    },
    // Heading
    "& h2": {
      margin: theme.spacing(2),
      marginRight: 0,
      marginLeft: 0,
      fontSize: 28,
      fontFamily: theme.typography.h2.fontFamily,
      lineHeight: 1.2,
      fontWeight: "normal",
      [theme.breakpoints.up(360)]: {
        marginBottom: theme.spacing(2),
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.h4.fontSize,
        width: "80%",
        alignSelf: "center",
        marginLeft: 0,
        marginRight: 0
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.75rem",
        lineHeight: 1.2,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        "&.error-text": {
          lineHeight: "4.5rem",
          fontSize: theme.typography.h2.fontSize,
          width: "100%",
          alignSelf: "flex-start"
        }
      },
      [theme.breakpoints.up("lg")]: {
        lineHeight: 1.43,
      },
      [theme.breakpoints.up("xl")]: {
        width: "75%",
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
      },
      "&.address-heading": {
        width: "100%",
        alignSelf: "start",
        margin: 0
      }
    },
    // Heading end
    // Heading H3
    "& h3": {
      margin: theme.spacing(2),
      marginRight: 0,
      marginLeft: 0,
      fontSize: "2.25rem",
      fontFamily: theme.typography.h3.fontFamily,
      lineHeight: 1.2,
      fontWeight: "normal",
      [theme.breakpoints.up(360)]: {
        marginBottom: theme.spacing(2),
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.h5.fontSize,
        width: "80%",
        alignSelf: "center",
        marginLeft: 0,
        marginRight: 0
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.25rem",
        lineHeight: 1.2,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        "&.error-text": {
          lineHeight: "4.5rem",
          fontSize: theme.typography.h3.fontSize,
          width: "100%",
          alignSelf: "flex-start"
        }
      },
      [theme.breakpoints.up("lg")]: {
        lineHeight: 1.2,
      },
      [theme.breakpoints.up("xl")]: {
        width: "75%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
      "&.address-heading": {
        width: "100%",
        alignSelf: "start",
        margin: 0
      }
    },
    // Heading end

    // Paragraph
    "& p": {
      "&:empty": {
        display: "none"
      },
      fontSize: 14,
      margin: theme.spacing(2),
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      "&.has-medium-font-size": {
        fontSize: 20
      },
      "&.has-large-font-size": {
        fontSize: 36
      },
      "&.has-huge-font-size": {
        fontSize: 48
      },
      [theme.breakpoints.up(413)]: {
        fontSize: "0.875rem",
      },
      [theme.breakpoints.up("sm")]: {
        width: "80%",
        fontSize: 16,
        alignSelf: "center",
        marginLeft: 0,
        marginRight: 0
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "1rem"
      },
      [theme.breakpoints.up("xl")]: {
        width: "75%",
      }
    },
    // Strong
    "& strong": {},
    // Lists
    "& ul": {
      listStyle: "none",
      padding: 0
    },
    // Separator
    "& hr": {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      width: "100%",
    },
    /**
     * Small gutter content styles
     */
    "&.smallgutter": {
      "& h2": {
        width: "100%"
      }
    },
    /**
     * Article content styles
     */
    "&.article": {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(10),
      },
      [theme.breakpoints.up("lg")]: {
        marginBottom: theme.spacing(12),
      },
      "& h2": {
        width: "100%"
      },
      "& p": {
        width: "100%",
        fontSize: 16,
        [theme.breakpoints.up("lg")]: {
          fontSize: 18,
          lineHeight: 1.6
        },
        "&.has-medium-font-size": {
          fontSize: 20,
          marginBottom: 0,
          [theme.breakpoints.up("md")]: {
            marginBottom: theme.spacing(2)
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: 22,
          }
        },
      },
      "& .wp-block-quote": {
        marginLeft: 0,
        marginRight: 0,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(5),
        },
        "& p": {
          fontFamily: theme.typography.h1.fontFamily,
          fontSize: "1.6rem",
          color: theme.palette.secondary.main,
          margin: 0,
          [theme.breakpoints.up("md")]: {
            fontSize: "2rem",
          }
        }
      },
      "& .wp-block-media-text": {
        marginTop: theme.spacing(5),
        [theme.breakpoints.up("sm")]: {
          display: "flex",
          flexDirection: "row",
          marginBottom: theme.spacing(5)
        },
        [theme.breakpoints.up("md")]: {
          marginBottom: theme.spacing(5)
        },
        "&.has-media-on-the-right": {
          flexDirection: "row-reverse",
          "& .wp-block-media-text__content": {
            marginLeft: 0,
            [theme.breakpoints.up("sm")]: {
              marginRight: theme.spacing(5)
            }
          }
        },
        "&.is-vertically-aligned-top": {
          alignItems: "flex-start",
        },
        "& .wp-block-media-text__media": {
          margin: 0
        },
        "&.is-image-fill .wp-block-media-text__media": {
          height: "280px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          margin: 0,
          marginBottom: theme.spacing(5),
          [theme.breakpoints.up(360)]: {
            height: "320px",
          },
          [theme.breakpoints.up("sm")]: {
            display: "flex",
            flex: 1,
            alignSelf: "stretch",
            height: "auto",
            marginBottom: 0
          },
          "& img": {
            display: "none"
          }
        }
      },
      "& .wp-block-media-text__media": {
        width: "initial",
        height: "initial",
      },
      "& .wp-block-media-text__content": {
        flex: 2,
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(5),
        },
        "& p": {
          "&:first-child": {
            marginTop: 0
          },
          "&:last-child": {
            marginBottom: 0
          }
        }
      },
    },
    /**
     * Fullscreen page styles
     */
    "&.fullscreen": {
      marginTop: 0,
      marginBottom: 0,
      paddingBottom: 0,
      "& h2": {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
      },
      "& p": {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
      },
      "& .wp-block-columns": {
        marginTop: 0,
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up("md")]: {
          marginTop: 0,
          marginBottom: 0,
        },
        "&.highlight-columns": {
          "& .wp-block-column": {
            position: "relative",
            [theme.breakpoints.up("md")]: {
              cursor: "pointer",
              flex: 1
            },
            "& .highlight-content": {
              position: "absolute",
              padding: theme.spacing(5),
              [theme.breakpoints.up("md")]: {
                padding: theme.spacing(5),
              },
              [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(8),
              },
              [theme.breakpoints.up("xl")]: {
                padding: theme.spacing(8),
              },
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 1,
              width: "100%",
              "& h3": {
                margin: 0,
                color: "#fff",
                fontSize: "1.5rem",
                [theme.breakpoints.up("md")]: {
                  fontSize: "2.5rem",
                  lineHeight: 1.2
                },
                fontFamily: "tt_norms_promedium",
                fontWeight: "normal",
                textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
              },
              "& .MuiButton-outlinedPrimary": {
                width: 300,
                borderColor: "rgba(245, 239, 234, 0.8)",
                color: "#F5EFEA",
                "&:hover": {
                  borderColor: "rgba(245, 239, 234, 1)",
                }
              },
              "& ~ figure.wp-block-image": {
                opacity: 0.6,
                margin: 0,
                width: "100%"
              }
            }
          }
        }
      },
      "& .wp-block-column": {
        margin: 0
      },
      "& .widget_flex-posts-list": {
        width: "100%",
        [theme.breakpoints.up("md")]: {
          flex: 1
        }
      },
      "& .fp-row": {
        marginLeft: 0,
        marginRight: 0,
        [theme.breakpoints.up("md")]: {
          flex: 1
        }
      },
      "& .fp-col": {
        position: "relative",
        minWidth: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        height: 300,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up("md")]: {
          flex: 1
        },
        [theme.breakpoints.up("lg")]: {
          height: 400,
        },
        [theme.breakpoints.up("xl")]: {
          height: 500,
        }
      },
      "& .fp-col:empty": {
        height: 0,
        visibility: "hidden",
        margintop: 0,
        marginBottom: 0,
      },
      "& .fp-thumbnail": {
        width: "100%",
        [theme.breakpoints.up("md")]: {
          display: "flex",
          flex: 1
        }
      },
      "& .fp-media": {
        display: "flex",
        height: "100%",
        opacity: 0.8
      },
      "& .fp-body": {
        position: "absolute",
        padding: theme.spacing(5),
        [theme.breakpoints.up("md")]: {
          padding: theme.spacing(5),
        },
        [theme.breakpoints.up("lg")]: {
          padding: theme.spacing(8),
        },
        [theme.breakpoints.up("xl")]: {
          padding: theme.spacing(8),
        },
        bottom: 0,
        color: theme.palette.primary.light,
        "& .fp-title a": {
          color: theme.palette.primary.light
        }
      },
      "& .fp-thumbnail img": {
        height: "100%",
      },
      "& .wp-block-embed__wrapper": {
        marginTop: 0,
      },
    },
    // Fullscreen end

    // Image
    "& .wp-block-image": {
      margin: 0,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginBottom: 20
      },
      "& img": {
        width: "100%",
      },
      "& figure": {
        margin: 0,
        "&.aligncenter": {
          margin: 0
        }
      }
    },
    // Columns
    "& .wp-block-columns": {
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(5),
      },
      "&.has-2-columns": {
        "&.contact-column": {
          marginTop: 0,
          width: "100%",
          "& .wp-block-column": {
            minWidth: "50%"
          },
        },
        "&.address-info": {
          flexDirection: "row",
          marginTop: theme.spacing(1),
          [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(2),
            width: "50%",
          },
          "& .wp-block-column": {
            marginBottom: theme.spacing(2),
            [theme.breakpoints.up("md")]: {
              flex: 1,
              margin: 0
            }
          }
        }
      }
    },
    // Single column
    "& .wp-block-column": {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
      "&:first-child": {
        [theme.breakpoints.up("md")]: {
          marginLeft: 0,
          marginRight: theme.spacing(2)
        }
      },
      "&:last-child": {
        [theme.breakpoints.up("md")]: {
          marginLeft: theme.spacing(2),
          marginRight: 0
        }
      },
      "& .wp-block-image": {
        "& a": {
          "& img": {
            [theme.breakpoints.up("md")]: {
              opacity: 0.9,
              transition: "transform 300ms ease-out, opacity 300ms ease-out, box-shadow 0.4s ease-out"
            },
            "&:hover": {
              [theme.breakpoints.up("md")]: {
                opacity: 1,
                transform: "scale(1.01)",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
              }
            }
          }
        }
      }
    },
    // Single column end

    // Address info
    "& .address-info":{
      "& .wp-block-column": {
        flexDirection: "column",
        "& p": {
          alignSelf: "start",
          margin: 0,
          [theme.breakpoints.up("lg")]: {
            fontSize: "1rem"
          }
        }
      }
    },
    /**
     * Contact card styles
     */
    "& .contact-card": {
      marginBottom: theme.spacing(5),
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(8),
        marginRight: theme.spacing(3)
      },
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(5)
      },
      [theme.breakpoints.up("lg")]: {
        marginRight: theme.spacing(8)
      },
      "& p": {
        fontSize: 12,
        width: "initial",
        alignSelf: "start",
        margin: 0,
        [theme.breakpoints.up(360)]: {
          fontSize: "0.875rem"
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "1rem"
        }
      },
      "& .wp-block-media-text__media": {
        backgroundColor: "#fff",
        margin: 0,
        width: 50,
        maxWidth: 50,
        height: 50,
        maxHeight: 50,
        [theme.breakpoints.up(360)]: {
          width: 75,
          maxWidth: 75,
          height: 75,
          maxHeight: 75,
        },
        [theme.breakpoints.up(413)]: {
          width: 100,
          maxWidth: 100,
          height: 100,
          maxHeight: 100,
        },
        [theme.breakpoints.up("sm")]: {
          width: 150,
          maxWidth: 150,
          height: 150,
          maxHeight: 150,
        },
        [theme.breakpoints.up("md")]: {
          width: 175,
          maxWidth: 175,
          height: 175,
          maxHeight: 175,
        },
        "& img": {
          width: "100%"
        }
      },
      "& .wp-block-media-text__content": {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.up(413)]: {
          marginLeft: theme.spacing(3),
        },
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(5),
        },
        [theme.breakpoints.up("md")]: {
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginLeft: theme.spacing(4),
        },
        "& h3": {
          fontSize: "1.2rem",
          marginTop: 0,
          marginBottom: 0,
          alignSelf: "start",
          [theme.breakpoints.up("md")]: {
            fontSize: 28,
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "2rem",
            marginBottom: "1rem"
          },
        },
        "& strong": {
          fontSize: 12,
          [theme.breakpoints.up(360)]: {
            fontSize: "0.875rem"
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1rem"
          },
        },
        "& ul": {
          marginBottom: 0,
          marginTop: theme.spacing(1),
          fontSize: 12,
          [theme.breakpoints.up(360)]: {
            fontSize: "0.875rem",
            marginBottom: theme.spacing(1)
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1rem"
          },
        }
      }
    },
    // Contact card end
    // Media & Text block
    "& .wp-block-media-text": {
      marginTop: theme.spacing(5),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(5)
      },
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5)
      },
      "&.has-media-on-the-right": {
        flexDirection: "row-reverse",
        "& .wp-block-media-text__content": {
          marginLeft: 0,
          [theme.breakpoints.up("sm")]: {
            marginRight: theme.spacing(5)
          },
          "& h3": {
            marginTop: 0
          }
        }
      },
      "&.is-vertically-aligned-top": {
        alignItems: "flex-start",
      },
      "& .wp-block-media-text__media": {
        margin: 0
      },
      "&.is-image-fill .wp-block-media-text__media": {
        height: "280px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        margin: 0,
        marginBottom: theme.spacing(5),
        [theme.breakpoints.up(360)]: {
          height: "320px",
        },
        [theme.breakpoints.up("sm")]: {
          display: "flex",
          flex: 1,
          alignSelf: "stretch",
          height: "auto",
          marginBottom: 0
        },
        "& img": {
          display: "none"
        }
      }
    },
    "& .wp-block-media-text__media": {
      width: "initial",
      height: "initial",
    },
    "& .wp-block-media-text__content": {
      flex: 2,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(5),
      },
      "& p": {
        "&:first-child": {
          marginTop: 0
        },
        "&:last-child": {
          marginBottom: 0
        }
      }
    },
    // Media & Text block end
    /**
     * Flex Posts styles
     */
    "& .fp-flex": {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      flexWrap: "wrap",
      [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
        flexDirection: "row",
      }
    },
    "& .fp-row": {
      marginLeft: -15,
      marginRight: -15,
    },
    "& .fp-post": {
      marginBottom: 20,
    },
    "& .fp-col": {
      minWidth: 200,
      maxWidth: "100%",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        flex: "1 1 30%",
        maxWidth: 470,
      },
      transition: "box-shadow 0.4s ease-out, transform 0.2s ease-out",
      "&:hover": {
        transform: "scale(1.01)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
      }
    },
    "& .fp-col:empty": {
      height: 0,
      visibility: "hidden",
      margintop: 0,
      marginBottom: 0,
    },
    "& .fp-list-1 .fp-flex, .fp-list-3 .fp-flex": {
      flexWrap: "nowrap",
    },
    "& .fp-list-1 .fp-media, .fp-list-3 .fp-extra .fp-media": {
      flexShrink: 0,
    },
    "& .fp-thumbnail": {
      display: "block",
      transition: "opacity 300ms ease",
    },
    "& .fp-list-1 .fp-thumbnail, .fp-list-3 .fp-extra .fp-thumbnail": {
      marginRight: "1em",
    },
    "& .fp-thumbnail:hover": {
      opacity: 0.9,
    },
    "& .fp-thumbnail img": {
      display: "block",
      width: "100%",
      objectFit: "cover",
      overflow: "hidden",
    },
    "& .fp-media .fp-thumbnail img": {
      margin: 0,
    },
    "& .fp-thumbnail img.size-thumbnail": {
      width: 85,
      height: 85,
    },
    "& .fp-list-2 .fp-media + .fp-body, .fp-list-3 .fp-main .fp-media + .fp-body": {
      marginTop: "0.8em",
    },
    "& .fp-title": {
      fontFamily: theme.typography.h4.fontFamily,
      fontSize: "1.5rem",
      margin: 0,
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
        lineHeight: 1.2
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "2.5rem"
      }
    },
    "& .fp-list-2 .fp-title, .fp-list-3 .fp-main .fp-title, .fp-list-4 .fp-title": {
      fontWeight: theme.typography.h4.fontWeight,
    },
    "& .fp-list-4 .fp-post": {
      marginLeft: -10,
      marginRight: -10,
    },
    "& .fp-list-4 .fp-media": {
      flex: "1 0 40%",
      minWidth: 150,
      maxWidth: 300,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: "0.8em",
    },
    "& .fp-list-4 .fp-body": {
      flex: "1 0 50%",
      marginLeft: 10,
      marginRight: 10,
    },
    "& .fp-title a": {
      color: theme.palette.primary.dark,
      textDecoration: "none",
    },
    "& .fp-excerpt": {
      marginTop: "1rem",
      fontFamily: theme.typography.subtitle2.fontFamily,
      fontSize: theme.typography.subtitle1.fontSize
    },
    "& .fp-meta": {
      marginTop: "0.1em",
    },
    "& .fp-meta a": {
      opacity: 0.5,
      color: theme.palette.primary.dark,
      textDecoration: "none",
    },
    "& .fp-comments > span": {
      opacity: 0.5,
    },
    "& .fp-meta a:hover": {
      opacity: 0.8,
    },
    "& .fp-meta > span:before": {
      content: "\a0\b7\a0",
      opacity: 0.5,
    },
    "& .fp-meta > span:first-child:before": {
      content: "",
    },
    "& .fp-categories": {
      display: "block",
      fontSize: "0.7em",
      margin: 0,
      opacity: 0.7,
      texttransform: "uppercase",
      letterspacing: "0.2em",
    },
    "& .fp-post .fp-readmore": {
      marginTop: "0.5em",
    },
    "& .fp-post .fp-readmore-link": {
      textDecoration: "none",
      fontSize: "0.9em",
      display: "inline-block",
      borderWidth: "1px",
      borderStyle: "solid",
      padding: "0.2em 0.7em",
      borderRadius: 3,
    },
    "& .fp-post .fp-readmore-link:hover": {
      textDecoration: "none",
    },
    "& .wp-block-embed": {
      margin: 0,
      display: "flex",
      justifyContent: "center",
      background: theme.palette.background.default
    },
    "& .wp-block-embed__wrapper": {
      width: "100%",
      "& iframe": {
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          height: 762
        },
        [theme.breakpoints.up("md")]: {
          height: 762
        },
        [theme.breakpoints.up("lg")]: {
          height: 762
        },
        [theme.breakpoints.up("xl")]: {
          height: 762
        },
      }
    },
    // Sponsor page styles
    "& .sponsori-item": {
      "& .MuiButton-outlinedPrimary": {
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        marginTop: 0
      },
      "& .wp-block-media-text__content": {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(13),
        "& h3": {
          marginTop: 0
        },
        "& p": {
          width: "100%"
        }
      },
      "& .wp-block-media-text__media": {
        padding: theme.spacing(4),
        margin: 0
      },
      "& img": {
        width: "15vw",
        maxWidth: "350px"
      },
      [theme.breakpoints.down("sm")]: {
        "& img": {
          width: "100%"
        },
        "& .wp-block-media-text__media": {
          padding: theme.spacing(3)
        },
        "& .wp-block-media-text__content": {
          padding: theme.spacing(4),
        }
      }
    }
  }
});