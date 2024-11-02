<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:value-of select="/basics/name"/>
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
        </style>
      </head>
      <body>
        <h1>
          <xsl:value-of select="/basics/name"/>
        </h1>
        <h2>
          <xsl:value-of select="/basics/label"/>
        </h2>
        <img src="{/basics/image}" alt="Photo de profil" width="150" height="150"/>

        <p>Email: <a href="mailto:{/basics/email}">
          <xsl:value-of select="/basics/email"/>
        </a>
      </p>
      <p>Téléphone: <xsl:value-of select="/basics/phone"/>
      </p>
      <p>Site web: <a href="{/basics/url}">
        <xsl:value-of select="/basics/url"/>
      </a>
    </p>
    <p>
      <xsl:value-of select="/basics/summary"/>
    </p>

    <div class="section">
      <h3>Adresse</h3>
      <p>
        <xsl:value-of select="/basics/location/address"/>
        <br/>
        <xsl:value-of select="/basics/location/postalCode"/>
        <xsl:value-of select="/basics/location/city"/>
        <br/>
        <xsl:value-of select="/basics/location/region"/>
,        <xsl:value-of select="/basics/location/countryCode"/>
      </p>
    </div>

    <div class="section">
      <h3>Profils en ligne</h3>
      <ul>
        <xsl:for-each select="/basics/profiles">
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
      <h3>Expérience Professionnelle</h3>
      <xsl:for-each select="/work">
        <div class="item">
          <h4>
            <xsl:value-of select="position"/>
 chez <xsl:value-of select="company"/>
          </h4>
          <p>
            <xsl:value-of select="location"/>
          </p>
          <p>
            <xsl:text>Du </xsl:text>
            <xsl:value-of select="startDate"/>
            <xsl:if test="endDate">
              <xsl:text> au </xsl:text>
              <xsl:value-of select="endDate"/>
            </xsl:if>
          </p>
          <p>
            <xsl:value-of select="summary"/>
          </p>
        </div>
      </xsl:for-each>
    </div>

    <div class="section">
      <h3>Bénévolat</h3>
      <xsl:for-each select="/volunteer">
        <div class="item">
          <h4>
            <xsl:value-of select="position"/>
 à            <xsl:value-of select="organization"/>
          </h4>
          <p>
            <xsl:text>Du </xsl:text>
            <xsl:value-of select="startDate"/>
            <xsl:if test="endDate">
              <xsl:text> au </xsl:text>
              <xsl:value-of select="endDate"/>
            </xsl:if>
          </p>
          <p>
            <xsl:value-of select="summary"/>
          </p>
        </div>
      </xsl:for-each>
    </div>

    <div class="section">
      <h3>Projets</h3>
      <xsl:for-each select="/projects">
        <div class="item">
          <h4>
            <xsl:value-of select="name"/>
          </h4>
          <p>
            <xsl:text>Du </xsl:text>
            <xsl:value-of select="startDate"/>
            <xsl:if test="endDate">
              <xsl:text> au </xsl:text>
              <xsl:value-of select="endDate"/>
            </xsl:if>
          </p>
          <p>
            <xsl:value-of select="summary"/>
          </p>
          <xsl:if test="url">
            <p>Site web: <a href="{url}">
              <xsl:value-of select="url"/>
            </a>
          </p>
        </xsl:if>
      </div>
    </xsl:for-each>
  </div>

  <div class="section">
    <h3>Formation</h3>
    <xsl:for-each select="/education">
      <div class="item">
        <h4>
          <xsl:value-of select="studyType"/>
 en <xsl:value-of select="area"/>
        </h4>
        <p>
          <xsl:value-of select="institution"/>
        </p>
        <p>
          <xsl:text>Du </xsl:text>
          <xsl:value-of select="startDate"/>
          <xsl:if test="endDate">
            <xsl:text> au </xsl:text>
            <xsl:value-of select="endDate"/>
          </xsl:if>
        </p>
        <p>
          <xsl:value-of select="gpa"/>
        </p>
        <p>
          <xsl:value-of select="summary"/>
        </p>
      </div>
    </xsl:for-each>
  </div>

  <div class="section">
    <h3>Récompenses</h3>
    <xsl:for-each select="/awards">
      <div class="item">
        <h4>
          <xsl:value-of select="title"/>
        </h4>
        <p>
          <xsl:value-of select="awarder"/>
 -          <xsl:value-of select="date"/>
        </p>
        <p>
          <xsl:value-of select="summary"/>
        </p>
      </div>
    </xsl:for-each>
  </div>

  <div class="section">
    <h3>Compétences</h3>
    <xsl:for-each select="/skills">
      <div class="item">
        <h4>
          <xsl:value-of select="name"/>
        </h4>
        <xsl:if test="level">
          <p>Niveau: <xsl:value-of select="level"/>
          </p>
        </xsl:if>
        <xsl:if test="keywords">
          <p>Mots-clés:
            <xsl:for-each select="keywords">
              <xsl:value-of select="."/>
              <xsl:if test="position() != last()">, </xsl:if>
            </xsl:for-each>
          </p>
        </xsl:if>
      </div>
    </xsl:for-each>
  </div>

  <div class="section">
    <h3>Langues</h3>
    <ul>
      <xsl:for-each select="/languages">
        <li>
          <strong>
            <xsl:value-of select="language"/>
          </strong>:          <xsl:value-of select="fluency"/>
        </li>
      </xsl:for-each>
    </ul>
  </div>

  <div class="section">
    <h3>Centres d'intérêt</h3>
    <xsl:for-each select="/interests">
      <div class="item">
        <h4>
          <xsl:value-of select="name"/>
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
  </div>

  <div class="section">
    <h3>Références</h3>
    <xsl:for-each select="/references">
      <div class="item">
        <h4>
          <xsl:value-of select="name"/>
        </h4>
        <p>
          <xsl:value-of select="reference"/>
        </p>
      </div>
    </xsl:for-each>
  </div>

</body>
</html>
</xsl:template>

</xsl:stylesheet>