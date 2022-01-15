import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head" style={(isHome) ? {...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }: {}}>
                        <div className="container">
                       <div className="site-mast">
                                <div className="site-mast-left">
                                { !isHome ?  <Link to="/">
                                        <h3 className="site-banner-logo">{site.title}</h3>
                                    </Link> :
                                    null}
                                </div>
                                <div className="site-mast-right">
                                    <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>
                                </div>
                            </div>
                            { isHome ?
                                <div className="site-banner">
                                    <h1 className="site-banner-title">{site.title}</h1>
                                    <p className="site-banner-desc">{site.description}</p>
                                    <img class="aem-logo" src="data:image/png;base64,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%3D%3D" />
                                </div> :
                                null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation data={site.navigation} navClass="site-nav-item" />
                                </div>
                                <div className="site-nav-right">
                                    <Link className="site-nav-button" to="/about">About</Link>
                                </div>
                                <div className="site-nav-right">
                                    <Link className="site-nav-button" to="/contact">Contact</Link>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> © 2021 &mdash; Published with <a className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
