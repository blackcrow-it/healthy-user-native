# Ứng dụng theo dõi sức khoẻ, chế độ dinh dưỡng cho mọi người

## Hãy clone dự án bằng cách
------------ clone project   ------------

	git clone https://github.com/blackcrow-it/healthy-user-native.git
	cd healthy-user-native
## cài đặt node_modules
------------ node_modules   ------------

	npm install hoặc yarn install

## Để start dự án, đầu tiên cần cài đặt angular/cli và ionic
------------ install env   ------------

	npm install -g @angular/cli
    npm install -g ionic
	npm install @ionic/storage --save

	npm install chart.js --save
	npm install ng-circle-progress --save

------------ run app   ------------

	ionic serve



## Deploy thành app android (Windows OS)
------------ Set biến môi trường   ------------

	set ANDROID_HOME=C:\<installation location>\sdk
	set GRADLE_HOME=C:\<installation location>
	set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools


Kiểm tra phiên bản java:

	java -version

Kiểm tra việc set biến môi trường:

	android

Kết quả:

	**************************************************************************
	The "android" command is deprecated.
	For manual SDK, AVD, and project management, please use Android Studio.
	For command-line tools, use tools\bin\sdkmanager.bat
	and tools\bin\avdmanager.bat
	**************************************************************************

	Invalid or unsupported command ""

	Supported commands are:
	android list target
	android list avd
	android list device
	android create avd
	android move avd
	android delete avd
	android list sdk
	android update sdk

Chạy lệnh run app thành android:

	ionic cordova platform add android
	ionic cordova run android --save

Trường hợp lỗi:

	* What went wrong:
	A problem occurred configuring project ':app'.
	> > Configure project :app
	Checking the license for package Android SDK Platform 28 in C:\Users\...\AppData\Local\Android\sdk\licenses
	Warning: License for package Android SDK Platform 28 not accepted.
	Failed to install the following Android SDK packages as some licences have not been accepted.
		platforms;android-28 Android SDK Platform 28
	To build this project, accept the SDK license agreements and install the missing components using the Android Studio SDK Manager.
	Alternatively, to transfer the license agreements from one workstation to another, see http://d.android.com/r/studio-ui/export-licenses.html

thì run lệnh:

	C:\...\AppData\Local\Android\Sdk\tools\bin\sdkmanager.bat --licenses