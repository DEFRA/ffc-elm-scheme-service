@Library('defra-library@v-8') _

def containerTag = ''
def cscServiceCode = 'ELM'
def cscServiceName = 'ELM'
def cscServiceType = 'Environmental Land Management'
def jenkinsPostgresUserCredId = 'ffc-elm-postgres-user-jenkins'
def mergedPrNo = ''
def planCommandQueueName = 'devffc-elm-plan-command-dev'
def pr = ''
def prPlanCommandQueueName = 'plan-command'
def prPostgresDatabaseName = 'ffc_elm_scheme'
def prPostgresExternalNameCredId = 'ffc-elm-postgres-external-name-pr'
def prPostgresUserCredId = 'ffc-elm-scheme-service-postgres-user-pr'
def prSqsQueuePrefix = 'devffc-elm-scheme-service'
def serviceName = 'ffc-elm-scheme-service'

def preDeployTasks = {
  def version = version.getPackageJsonVersion()
  def commitSha = utils.getCommitSha()
  def repoName = utils.getRepoName()

  if (pr != '') {
    stage('Provision PR infrastructure') {
      (serviceName, pr, containerTag, mergedPrNo) = defraUtils.getVariables(this, defraUtils.getPackageJsonVersion())
      defraUtils.provisionPrDatabaseRoleAndSchema(this, prPostgresExternalNameCredId, prPostgresDatabaseName, jenkinsPostgresUserCredId, prPostgresUserCredId, pr, true)
      defraUtils.provisionPrSqsQueue(this, prSqsQueuePrefix, pr, prPlanCommandQueueName, cscServiceCode, cscServiceName, cscServiceType)
    }
  }
}

buildNodeJs environment: 'dev'
  testClosure: preDeployTasks
