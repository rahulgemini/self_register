pipeline {
  agent any
 environment {
        PATH = "C:\\WINDOWS\\SYSTEM32"
        GITHUB_KEY_ID     = credentials('github_key')
    }
  tools {nodejs "NodeJSInstall"}
 
  stages {
    stage('AddUser') {
      steps {
          script{
              userCause=currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause');
              userName="";
              if(params.REGISTER_MYSELF){
                  env.USER_NAME=userCause.userId[0];
              }
              else 
                  env.USER_NAME=params.OTHER_GITHUB_USERNAME;
             // echo userCause;
          }
          echo userCause.userId[0];
         // echo params.REGISTER_MYSELF
          echo params.GITHUB_TEAM;
          echo env.USER_NAME;
          echo GITHUB_KEY_ID;
        bat "node index.mjs ${env.USER_NAME} ${params.GITHUB_TEAM} ${GITHUB_KEY_ID}";
      }
    }
  }
}
