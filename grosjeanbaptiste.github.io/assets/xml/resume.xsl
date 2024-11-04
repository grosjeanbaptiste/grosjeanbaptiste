<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:exsl="http://exslt.org/common" extension-element-prefixes="exsl">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:variable name="languages">
    <lang code="en"/>
    <lang code="fr"/>
    <lang code="nl"/>
  </xsl:variable>

  <xsl:template match="/">

    <html>
      <head>
        <title>
          <xsl:value-of select="/resume/basics/name"/>
     - CV</title>
        <meta charset="UTF-8"/>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1, h2, h3, h4 { color: #333; }
          h1 { font-size: 2em; }
          h2 { font-size: 1.5em; }
          h3 { font-size: 1.2em; }
          h4 { font-size: 1em; }
          p { line-height: 1.5; }
          ul { list-style-type: none; padding: 0; }
          li { margin-bottom: 5px; }
          .section { margin-top: 30px; }
          .item { margin-bottom: 20px; }
          [lang] { display: none; } [lang="en"] { display: block; }
        </style>
        <script>
          function changeLanguage(lang) {
            var elements = document.querySelectorAll('[lang]');
            elements.forEach(function(el) {
              if (el.getAttribute('lang') === lang) {
                el.style.display = 'block';
              } else {
                el.style.display = 'none';
              }
            });
          }
        </script>
      </head>
      <body>
        <div>
          <button onclick="changeLanguage('en')">English</button>
          <button onclick="changeLanguage('fr')">Français</button>
          <button onclick="changeLanguage('nl')">Nederlands</button>
        </div>

        <h1>
          <xsl:value-of select="/resume/basics/name"/>
        </h1>
        <h2>
          <xsl:for-each select="exsl:node-set($languages)/lang">
            <xsl:variable name="langCode" select="@code"/>
            <span lang="{$langCode}">
              <xsl:value-of select="/resume/basics/label/text[@lang = $langCode]"/>
            </span>
          </xsl:for-each>
        </h2>
        <img src="{/resume/basics/image}" alt="Photo de profil" width="150" height="150"/>

        <p>Email: <a href="mailto:{/resume/basics/email}">
          <xsl:value-of select="/resume/basics/email"/>
        </a>
      </p>
      <p>
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <span lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Phone:</xsl:when>
              <xsl:when test="$langCode = 'fr'">Téléphone:</xsl:when>
              <xsl:when test="$langCode = 'nl'">Telefoon:</xsl:when>
            </xsl:choose>
            <xsl:text></xsl:text>
            <xsl:value-of select="/resume/basics/phone"/>
          </span>
        </xsl:for-each>
      </p>
      <p>
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <span lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Website:</xsl:when>
              <xsl:when test="$langCode = 'fr'">Site web:</xsl:when>
              <xsl:when test="$langCode = 'nl'">Website:</xsl:when>
            </xsl:choose>
            <xsl:text></xsl:text>
            <a href="{/resume/basics/url}">
              <xsl:value-of select="/resume/basics/url"/>
            </a>
          </span>
        </xsl:for-each>
      </p>
      <p>
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <span lang="{$langCode}">
            <xsl:value-of select="/resume/basics/summary/text[@lang = $langCode]"/>
          </span>
        </xsl:for-each>
      </p>

      <div class="section">
        <h3>
          <xsl:for-each select="exsl:node-set($languages)/lang">
            <xsl:variable name="langCode" select="@code"/>
            <span lang="{$langCode}">
              <xsl:choose>
                <xsl:when test="$langCode = 'en'">Address</xsl:when>
                <xsl:when test="$langCode = 'fr'">Adresse</xsl:when>
                <xsl:when test="$langCode = 'nl'">Adres</xsl:when>
              </xsl:choose>
            </span>
          </xsl:for-each>
        </h3>
        <p>
          <xsl:value-of select="/resume/basics/location/address"/>
          <br/>
          <xsl:value-of select="/resume/basics/location/postalCode"/>
          <xsl:text></xsl:text>
          <xsl:value-of select="/resume/basics/location/city"/>
          <br/>
          <xsl:value-of select="/resume/basics/location/region"/>
          <xsl:text>, </xsl:text>
          <xsl:value-of select="/resume/basics/location/countryCode"/>
        </p>
      </div>

      <div class="section">
        <h3>
          <xsl:for-each select="exsl:node-set($languages)/lang">
            <xsl:variable name="langCode" select="@code"/>
            <span lang="{$langCode}">
              <xsl:choose>
                <xsl:when test="$langCode = 'en'">Online Profiles</xsl:when>
                <xsl:when test="$langCode = 'fr'">Profils en ligne</xsl:when>
                <xsl:when test="$langCode = 'nl'">Online Profielen</xsl:when>
              </xsl:choose>
            </span>
          </xsl:for-each>
        </h3>
        <ul>
          <xsl:for-each select="/resume/basics/profiles">
            <li>
              <strong>
                <xsl:value-of select="network"/>
                  :</strong>
              <a href="{url}">
                <xsl:value-of select="username"/>
              </a>
            </li>
          </xsl:for-each>
        </ul>
      </div>

      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Work Experience</xsl:when>
              <xsl:when test="$langCode = 'fr'">Expérience Professionnelle</xsl:when>
              <xsl:when test="$langCode = 'nl'">Werkervaring</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/work">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:choose>
                  <xsl:when test="position/text[@lang = $langCode]">
                    <xsl:value-of select="position/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="position"/>
                  </xsl:otherwise>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:choose>
                  <xsl:when test="$langCode = 'en'">at</xsl:when>
                  <xsl:when test="$langCode = 'fr'">chez</xsl:when>
                  <xsl:when test="$langCode = 'nl'">bij</xsl:when>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:value-of select="company"/>
              </h4>
              <p>
                <xsl:choose>
                  <xsl:when test="$langCode = 'en'">From</xsl:when>
                  <xsl:when test="$langCode = 'fr'">Du</xsl:when>
                  <xsl:when test="$langCode = 'nl'">Van</xsl:when>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:value-of select="startDate"/>
                <xsl:if test="endDate">
                  <xsl:text></xsl:text>
                  <xsl:choose>
                    <xsl:when test="$langCode = 'en'">to</xsl:when>
                    <xsl:when test="$langCode = 'fr'">au</xsl:when>
                    <xsl:when test="$langCode = 'nl'">tot</xsl:when>
                  </xsl:choose>
                  <xsl:text></xsl:text>
                  <xsl:value-of select="endDate"/>
                </xsl:if>
              </p>
              <p>
                <xsl:choose>
                  <xsl:when test="summary/text[@lang = $langCode]">
                    <xsl:value-of select="summary/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="summary"/>
                  </xsl:otherwise>
                </xsl:choose>
              </p>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>

      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Volunteering</xsl:when>
              <xsl:when test="$langCode = 'fr'">Bénévolat</xsl:when>
              <xsl:when test="$langCode = 'nl'">Vrijwilligerswerk</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/volunteer">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:choose>
                  <xsl:when test="position/text[@lang = $langCode]">
                    <xsl:value-of select="position/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="position"/>
                  </xsl:otherwise>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:choose>
                  <xsl:when test="$langCode = 'en'">at</xsl:when>
                  <xsl:when test="$langCode = 'fr'">à</xsl:when>
                  <xsl:when test="$langCode = 'nl'">bij</xsl:when>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:value-of select="organization"/>
              </h4>
              <p>
                <xsl:choose>
                  <xsl:when test="$langCode = 'en'">From</xsl:when>
                  <xsl:when test="$langCode = 'fr'">Du</xsl:when>
                  <xsl:when test="$langCode = 'nl'">Van</xsl:when>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:value-of select="startDate"/>
                <xsl:if test="endDate">
                  <xsl:text></xsl:text>
                  <xsl:choose>
                    <xsl:when test="$langCode = 'en'">to</xsl:when>
                    <xsl:when test="$langCode = 'fr'">au</xsl:when>
                    <xsl:when test="$langCode = 'nl'">tot</xsl:when>
                  </xsl:choose>
                  <xsl:text></xsl:text>
                  <xsl:value-of select="endDate"/>
                </xsl:if>
              </p>
              <p>
                <xsl:choose>
                  <xsl:when test="summary/text[@lang = $langCode]">
                    <xsl:value-of select="summary/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="summary"/>
                  </xsl:otherwise>
                </xsl:choose>
              </p>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>

      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Projects</xsl:when>
              <xsl:when test="$langCode = 'fr'">Projets</xsl:when>
              <xsl:when test="$langCode = 'nl'">Projecten</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/projects">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:choose>
                  <xsl:when test="name/text[@lang = $langCode]">
                    <xsl:value-of select="name/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="name"/>
                  </xsl:otherwise>
                </xsl:choose>
              </h4>
              <p>
                <xsl:choose>
                  <xsl:when test="$langCode = 'en'">From</xsl:when>
                  <xsl:when test="$langCode = 'fr'">Du</xsl:when>
                  <xsl:when test="$langCode = 'nl'">Van</xsl:when>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:value-of select="startDate"/>
                <xsl:if test="endDate">
                  <xsl:text></xsl:text>
                  <xsl:choose>
                    <xsl:when test="$langCode = 'en'">to</xsl:when>
                    <xsl:when test="$langCode = 'fr'">au</xsl:when>
                    <xsl:when test="$langCode = 'nl'">tot</xsl:when>
                  </xsl:choose>
                  <xsl:text></xsl:text>
                  <xsl:value-of select="endDate"/>
                </xsl:if>
              </p>
              <p>
                <xsl:choose>
                  <xsl:when test="summary/text[@lang = $langCode]">
                    <xsl:value-of select="summary/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="summary"/>
                  </xsl:otherwise>
                </xsl:choose>
              </p>
              <xsl:if test="url">
                <p>
                  <xsl:choose>
                    <xsl:when test="$langCode = 'en'">Website:</xsl:when>
                    <xsl:when test="$langCode = 'fr'">Site web:</xsl:when>
                    <xsl:when test="$langCode = 'nl'">Website:</xsl:when>
                  </xsl:choose>
                  <xsl:text></xsl:text>
                  <a href="{url}">
                    <xsl:value-of select="url"/>
                  </a>
                </p>
              </xsl:if>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>

      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Education</xsl:when>
              <xsl:when test="$langCode = 'fr'">Formation</xsl:when>
              <xsl:when test="$langCode = 'nl'">Opleiding</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/education">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:choose>
                  <xsl:when test="studyType/text[@lang = $langCode]">
                    <xsl:value-of select="studyType/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="studyType"/>
                  </xsl:otherwise>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:choose>
                  <xsl:when test="$langCode = 'en'">in</xsl:when>
                  <xsl:when test="$langCode = 'fr'">en</xsl:when>
                  <xsl:when test="$langCode = 'nl'">in</xsl:when>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:choose>
                  <xsl:when test="area/text[@lang = $langCode]">
                    <xsl:value-of select="area/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="area"/>
                  </xsl:otherwise>
                </xsl:choose>
              </h4>
              <p>
                <xsl:value-of select="institution"/>
              </p>
              <p>
                <xsl:choose>
                  <xsl:when test="$langCode = 'en'">From</xsl:when>
                  <xsl:when test="$langCode = 'fr'">Du</xsl:when>
                  <xsl:when test="$langCode = 'nl'">Van</xsl:when>
                </xsl:choose>
                <xsl:text></xsl:text>
                <xsl:value-of select="startDate"/>
                <xsl:if test="endDate">
                  <xsl:text></xsl:text>
                  <xsl:choose>
                    <xsl:when test="$langCode = 'en'">to</xsl:when>
                    <xsl:when test="$langCode = 'fr'">au</xsl:when>
                    <xsl:when test="$langCode = 'nl'">tot</xsl:when>
                  </xsl:choose>
                  <xsl:text></xsl:text>
                  <xsl:value-of select="endDate"/>
                </xsl:if>
              </p>
              <p>
                <xsl:value-of select="gpa"/>
              </p>
              <p>
                <xsl:choose>
                  <xsl:when test="summary/text[@lang = $langCode]">
                    <xsl:value-of select="summary/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="summary"/>
                  </xsl:otherwise>
                </xsl:choose>
              </p>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>

      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Awards</xsl:when>
              <xsl:when test="$langCode = 'fr'">Récompenses</xsl:when>
              <xsl:when test="$langCode = 'nl'">Onderscheidingen</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/awards">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:value-of select="title"/>
              </h4>
              <p>
                <xsl:value-of select="awarder"/>
                <xsl:text> - </xsl:text>
                <xsl:value-of select="date"/>
              </p>
              <p>
                <xsl:value-of select="summary"/>
              </p>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>

      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Skills</xsl:when>
              <xsl:when test="$langCode = 'fr'">Compétences</xsl:when>
              <xsl:when test="$langCode = 'nl'">Vaardigheden</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/skills">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:value-of select="name"/>
              </h4>
              <xsl:if test="level">
                <p>
                  <xsl:choose>
                    <xsl:when test="$langCode = 'en'">Level:</xsl:when>
                    <xsl:when test="$langCode = 'fr'">Niveau:</xsl:when>
                    <xsl:when test="$langCode = 'nl'">Niveau:</xsl:when>
                  </xsl:choose>
                  <xsl:text></xsl:text>
                  <xsl:value-of select="level"/>
                </p>
              </xsl:if>
              <xsl:if test="keywords">
                <p>
                  <xsl:choose>
                    <xsl:when test="$langCode = 'en'">Keywords:</xsl:when>
                    <xsl:when test="$langCode = 'fr'">Mots-clés:</xsl:when>
                    <xsl:when test="$langCode = 'nl'">Trefwoorden:</xsl:when>
                  </xsl:choose>
                  <xsl:text></xsl:text>
                  <xsl:for-each select="keywords">
                    <xsl:value-of select="."/>
                    <xsl:if test="position() != last()">, </xsl:if>
                  </xsl:for-each>
                </p>
              </xsl:if>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>

      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Languages</xsl:when>
              <xsl:when test="$langCode = 'fr'">Langues</xsl:when>
              <xsl:when test="$langCode = 'nl'">Talen</xsl:when>
            </xsl:choose>
          </h3>
          <ul>
            <xsl:for-each select="/resume/languages">
              <li lang="{$langCode}">
                <strong>
                  <xsl:value-of select="language"/>
                </strong>
                <xsl:text>: </xsl:text>
                <xsl:value-of select="fluency"/>
              </li>
            </xsl:for-each>
          </ul>
        </xsl:for-each>
      </div>
      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">Interests</xsl:when>
              <xsl:when test="$langCode = 'fr'">Centres d'intérêt</xsl:when>
              <xsl:when test="$langCode = 'nl'">Interesses</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/interests">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:choose>
                  <xsl:when test="name/text[@lang = $langCode]">
                    <xsl:value-of select="name/text[@lang = $langCode]"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="name"/>
                  </xsl:otherwise>
                </xsl:choose>
              </h4>
              <xsl:if test="keywords">
                <p>
                  <xsl:for-each select="keywords">
                    <xsl:value-of select="."/>
                    <xsl:if test="position() != last()">, </xsl:if>
                  </xsl:for-each>
                </p>
              </xsl:if>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>


      <div class="section">
        <xsl:for-each select="exsl:node-set($languages)/lang">
          <xsl:variable name="langCode" select="@code"/>
          <h3 lang="{$langCode}">
            <xsl:choose>
              <xsl:when test="$langCode = 'en'">References</xsl:when>
              <xsl:when test="$langCode = 'fr'">Références</xsl:when>
              <xsl:when test="$langCode = 'nl'">Referenties</xsl:when>
            </xsl:choose>
          </h3>
          <xsl:for-each select="/resume/references">
            <div class="item" lang="{$langCode}">
              <h4>
                <xsl:value-of select="name"/>
              </h4>
              <p>
                <xsl:value-of select="reference"/>
              </p>
            </div>
          </xsl:for-each>
        </xsl:for-each>
      </div>

    </body>
  </html>
</xsl:template>
</xsl:stylesheet>