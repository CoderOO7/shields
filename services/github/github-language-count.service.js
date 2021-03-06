'use strict'

const { BaseGithubLanguage } = require('./github-languages-base')
const { documentation } = require('./github-helpers')

module.exports = class GithubLanguageCount extends BaseGithubLanguage {
  static category = 'analysis'
  static route = { base: 'github/languages/count', pattern: ':user/:repo' }
  static examples = [
    {
      title: 'GitHub language count',
      namedParams: {
        user: 'badges',
        repo: 'shields',
      },
      staticPreview: this.render({ count: 5 }),
      documentation,
    },
  ]

  static defaultBadgeData = { label: 'languages' }

  static render({ count }) {
    return {
      message: count,
      color: 'blue',
    }
  }

  async handle({ user, repo }) {
    const data = await this.fetch({ user, repo })
    return this.constructor.render({ count: Object.keys(data).length })
  }
}
